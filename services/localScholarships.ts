/**
 * localScholarships.ts
 * Searches the local scholarship dataset (public/scholarships.json)
 * Drop-in replacement / fallback for the Gemini API findScholarships call.
 */

import { Scholarship, SearchParams, SearchResult } from '../types';

// ── Compact record shape stored in the JSON ──────────────────────────────────
interface RawRecord {
  n: string;   // scholarship_name
  p: string;   // provider
  hc: string;  // host_country
  tr: string;  // target_region
  tm: string;  // target_major
  sl: string;  // study_level  (Undergraduate | Masters | PhD | Postdoctoral | High School)
  cr: string;  // citizenship_required
  gpa: string; // gpa_requirement
  ielts: string;
  toefl: string;
  amt: string;  // award_amount_usd
  dl: string;   // deadline_month
  ren: string;  // renewable (Yes | No)
}

// ── Cached data so we only fetch once ─────────────────────────────────────────
let _cache: RawRecord[] | null = null;

async function loadData(): Promise<RawRecord[]> {
  if (_cache) return _cache;
  const res = await fetch('/scholarships.json');
  if (!res.ok) throw new Error('Failed to load local scholarship data.');
  _cache = (await res.json()) as RawRecord[];
  return _cache;
}

// ── Normalisation helpers ─────────────────────────────────────────────────────

/** Map app study-level labels → dataset labels */
const STUDY_LEVEL_MAP: Record<string, string[]> = {
  "bachelor's degree": ['undergraduate'],
  undergraduate:       ['undergraduate'],
  "master's degree":   ['masters'],
  masters:             ['masters'],
  phd:                 ['phd', 'postdoctoral'],
  'phd / doctorate':   ['phd', 'postdoctoral'],
  postdoctoral:        ['postdoctoral'],
  'high school':       ['high school'],
};

function normaliseStudyLevel(level: string): string[] {
  return STUDY_LEVEL_MAP[level.toLowerCase()] ?? [level.toLowerCase()];
}

/**
 * Return true when a record's citizenship_required field is compatible
 * with the user's origin country.
 *
 * Logic (in order of specificity):
 *  1. "Any" / "International" → always eligible
 *  2. Exact country match  (e.g. "Uzbekistan" ↔ "Uzbekistan")
 *  3. Broad group match    (e.g. "India" → "South Asian Countries")
 *  4. If the field lists a specific OTHER country / group that doesn't
 *     match → ineligible
 */
const CITIZENSHIP_GROUPS: Record<string, string[]> = {
  'south asian countries': ['india', 'pakistan', 'bangladesh', 'sri lanka', 'nepal', 'bhutan', 'maldives', 'afghanistan', 'uzbekistan', 'tajikistan', 'kyrgyzstan', 'kazakhstan', 'turkmenistan'],
  'central asian countries': ['uzbekistan', 'kazakhstan', 'kyrgyzstan', 'tajikistan', 'turkmenistan'],
  'southeast asian countries': ['vietnam', 'indonesia', 'philippines', 'thailand', 'malaysia', 'myanmar', 'cambodia', 'laos', 'singapore', 'brunei', 'timor-leste'],
  'asian countries': ['india', 'china', 'japan', 'south korea', 'vietnam', 'indonesia', 'philippines', 'thailand', 'malaysia', 'myanmar', 'cambodia', 'laos', 'singapore', 'uzbekistan', 'kazakhstan', 'kyrgyzstan', 'tajikistan'],
  'african countries': ['nigeria', 'kenya', 'ghana', 'ethiopia', 'tanzania', 'uganda', 'south africa', 'egypt', 'morocco', 'senegal'],
  'latin american countries': ['brazil', 'mexico', 'colombia', 'argentina', 'chile', 'peru', 'venezuela', 'ecuador'],
  'developing countries': ['india', 'pakistan', 'bangladesh', 'nigeria', 'kenya', 'ghana', 'vietnam', 'indonesia', 'uzbekistan', 'tajikistan', 'kyrgyzstan', 'kazakhstan', 'ethiopia'],
  'mena region': ['egypt', 'morocco', 'tunisia', 'jordan', 'lebanon', 'iraq', 'iran', 'saudi arabia', 'turkey'],
  'commonwealth countries': ['india', 'pakistan', 'bangladesh', 'nigeria', 'kenya', 'ghana', 'south africa', 'australia', 'canada', 'new zealand', 'malaysia', 'singapore'],
  'eu citizens': ['germany', 'france', 'italy', 'spain', 'netherlands', 'poland', 'sweden', 'denmark', 'finland', 'norway'],
};

function isCitizenshipMatch(cr: string, originCountry: string): boolean {
  const req = cr.toLowerCase().trim();
  const origin = originCountry.toLowerCase().trim();

  if (req === 'any' || req === 'international') return true;
  if (req === origin) return true;

  // Check if the requirement is a group that includes the origin
  const group = CITIZENSHIP_GROUPS[req];
  if (group && group.includes(origin)) return true;

  return false;
}

/** Flexible region matching */
function isRegionMatch(tr: string, targetRegion: string): boolean {
  if (!targetRegion || targetRegion.toLowerCase() === 'anywhere globally') return true;
  const rec = tr.toLowerCase();
  const req = targetRegion.toLowerCase();
  if (rec === req) return true;
  if (rec === 'global' || rec === 'anywhere globally') return true;
  // Partial containment (e.g. "Southeast Asia" contains "Asia")
  if (rec.includes(req) || req.includes(rec)) return true;
  return false;
}

/** Flexible major/field matching */
function isMajorMatch(tm: string, fieldOfStudy: string): boolean {
  if (!fieldOfStudy) return true;
  const rec = tm.toLowerCase();
  const req = fieldOfStudy.toLowerCase();
  if (rec === 'any') return true;
  if (rec.includes(req) || req.includes(rec)) return true;
  // STEM umbrella
  const stemFields = ['computer science', 'engineering', 'mathematics', 'physics', 'chemistry', 'biology', 'data science', 'electrical engineering', 'mechanical engineering', 'civil engineering', 'chemical engineering'];
  if (rec === 'stem' && stemFields.some((s) => req.includes(s) || s.includes(req))) return true;
  return false;
}

// ── Score a record for ranking ────────────────────────────────────────────────
function scoreRecord(rec: RawRecord, params: SearchParams): number {
  let score = 0;
  if (rec.cr.toLowerCase() !== 'any' && rec.cr.toLowerCase() !== 'international') score += 10;
  const gpaReq = parseFloat(rec.gpa);
  const userGpa = parseFloat(params.gpa ?? '');
  if (!isNaN(gpaReq) && !isNaN(userGpa) && userGpa >= gpaReq) score += 8;
  const ieltsReq = parseFloat(rec.ielts);
  const userIelts = parseFloat(params.ielts ?? '');
  if (!isNaN(ieltsReq) && !isNaN(userIelts) && userIelts >= ieltsReq) score += 5;
  if (isMajorMatch(rec.tm, params.fieldOfStudy)) score += 6;
  if (isRegionMatch(rec.tr, params.targetRegion)) score += 4;
  return score;
}

// ── Map raw record → Scholarship type ─────────────────────────────────────────
function toScholarship(rec: RawRecord): Scholarship {
  const amt = parseFloat(rec.amt);
  const amtStr = isNaN(amt) ? 'See details' : `$${amt.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  const renewable = rec.ren === 'Yes' ? ' (Renewable)' : '';

  return {
    name: rec.n,
    provider: rec.p,
    amount: amtStr + renewable,
    deadline: rec.dl ? `${rec.dl} (deadline month)` : 'Rolling',
    description: `${rec.sl} scholarship in ${rec.tm} hosted in ${rec.hc}. Eligibility: ${rec.cr}.`,
    eligibility: [rec.cr, rec.sl, rec.tm].filter(Boolean),
    location: rec.hc,
    applicationUrl: `https://www.google.com/search?q=${encodeURIComponent(rec.n + ' ' + rec.p + ' scholarship official')}`,
  };
}

// ── Public API ────────────────────────────────────────────────────────────────
export async function findScholarshipsLocal(params: SearchParams): Promise<SearchResult> {
  const data = await loadData();

  const targetStudyLevels = normaliseStudyLevel(params.studyLevel);

  const matched = data.filter((rec) => {
    // Study level
    if (!targetStudyLevels.includes(rec.sl.toLowerCase())) return false;
    // Citizenship
    if (!isCitizenshipMatch(rec.cr, params.originCountry)) return false;
    // Region
    if (!isRegionMatch(rec.tr, params.targetRegion)) return false;
    // Major (only filter if user provided one)
    if (params.fieldOfStudy && !isMajorMatch(rec.tm, params.fieldOfStudy)) return false;
    // GPA gate: only exclude if user provided a GPA and it's strictly below requirement
    const gpaReq = parseFloat(rec.gpa);
    const userGpa = parseFloat(params.gpa ?? '');
    if (!isNaN(gpaReq) && !isNaN(userGpa) && userGpa < gpaReq - 0.1) return false;
    return true;
  });

  // Sort by score descending, then cap at 30 results
  const ranked = matched
    .map((rec) => ({ rec, score: scoreRecord(rec, params) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 30)
    .map(({ rec }) => toScholarship(rec));

  return {
    scholarships: ranked,
    sources: [],
  };
}
