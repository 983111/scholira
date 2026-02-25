import { CourseSearchParams, CourseSearchResult, GroundingSource, Scholarship, SearchParams, SearchResult } from '../types';

const SCHOLARSHIP_API_URL = 'https://scholara-rag-api.vishwajeetadkine705.workers.dev';
const COURSE_API_URL = 'https://scholara-backend.vishwajeetadkine705.workers.dev';

const toArray = <T>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);

const normalizeSources = (payload: Record<string, unknown>): GroundingSource[] => {
  const sourcePool = (payload.sources || payload.groundingSources || payload.references) as unknown;
  return toArray<Record<string, unknown>>(sourcePool)
    .map((source) => ({
      title: typeof source.title === 'string' ? source.title : 'Reference',
      uri: typeof source.uri === 'string' ? source.uri : typeof source.url === 'string' ? source.url : '',
    }))
    .filter((source) => source.uri);
};

const normalizeScholarships = (payload: Record<string, unknown>): Scholarship[] => {
  const rawScholarships =
    toArray<Record<string, unknown>>(payload.scholarships).length > 0
      ? toArray<Record<string, unknown>>(payload.scholarships)
      : toArray<Record<string, unknown>>(payload.results).length > 0
      ? toArray<Record<string, unknown>>(payload.results)
      : toArray<Record<string, unknown>>(payload.data);

  return rawScholarships
    .map((item) => ({
      name: typeof item.name === 'string' ? item.name : typeof item.title === 'string' ? item.title : 'Scholarship Opportunity',
      provider:
        typeof item.provider === 'string'
          ? item.provider
          : typeof item.organization === 'string'
          ? item.organization
          : 'Official Provider',
      amount: typeof item.amount === 'string' ? item.amount : typeof item.funding === 'string' ? item.funding : 'See details',
      deadline:
        typeof item.deadline === 'string'
          ? item.deadline
          : typeof item.applicationDeadline === 'string'
          ? item.applicationDeadline
          : 'Rolling',
      description:
        typeof item.description === 'string'
          ? item.description
          : typeof item.summary === 'string'
          ? item.summary
          : 'Review provider details for this opportunity.',
      eligibility: toArray<string>(item.eligibility).filter((entry): entry is string => typeof entry === 'string'),
      location:
        typeof item.location === 'string'
          ? item.location
          : typeof item.country === 'string'
          ? item.country
          : 'Global',
      applicationUrl:
        typeof item.applicationUrl === 'string'
          ? item.applicationUrl
          : typeof item.url === 'string'
          ? item.url
          : undefined,
    }))
    .filter((item) => item.name);
};

const normalizeCourses = (payload: Record<string, unknown>): CourseSearchResult => {
  const rawCourses =
    toArray<Record<string, unknown>>(payload.courses).length > 0
      ? toArray<Record<string, unknown>>(payload.courses)
      : toArray<Record<string, unknown>>(payload.results).length > 0
      ? toArray<Record<string, unknown>>(payload.results)
      : toArray<Record<string, unknown>>(payload.data);

  const courses = rawCourses.map((course, index) => ({
    id: typeof course.id === 'string' ? course.id : `${course.name ?? course.title ?? 'course'}-${index}`,
    name: typeof course.name === 'string' ? course.name : typeof course.title === 'string' ? course.title : 'Course Opportunity',
    provider:
      typeof course.provider === 'string'
        ? course.provider
        : typeof course.platform === 'string'
        ? course.platform
        : 'Trusted Provider',
    subject: typeof course.subject === 'string' ? course.subject : typeof course.category === 'string' ? course.category : 'General',
    level: typeof course.level === 'string' ? course.level : 'All levels',
    duration: typeof course.duration === 'string' ? course.duration : 'Self-paced',
    cost: typeof course.cost === 'string' ? course.cost : typeof course.price === 'string' ? course.price : 'See provider',
    description:
      typeof course.description === 'string'
        ? course.description
        : typeof course.summary === 'string'
        ? course.summary
        : 'Explore curriculum and enrollment options.',
    skills: toArray<string>(course.skills).filter((item): item is string => typeof item === 'string'),
    tags: toArray<string>(course.tags).filter((item): item is string => typeof item === 'string'),
    link: typeof course.link === 'string' ? course.link : typeof course.url === 'string' ? course.url : undefined,
  }));

  return {
    courses,
    total: typeof payload.total === 'number' ? payload.total : courses.length,
  };
};

const parseJsonResponse = async (response: Response): Promise<Record<string, unknown>> => {
  const json = (await response.json()) as unknown;
  if (!json || typeof json !== 'object') {
    return {};
  }
  return json as Record<string, unknown>;
};

export const findScholarships = async (params: SearchParams): Promise<SearchResult> => {
  const response = await fetch(SCHOLARSHIP_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...params, type: 'scholarships' }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch scholarships. Status: ${response.status}`);
  }

  const payload = await parseJsonResponse(response);
  return {
    scholarships: normalizeScholarships(payload),
    rawText: typeof payload.rawText === 'string' ? payload.rawText : typeof payload.text === 'string' ? payload.text : undefined,
    sources: normalizeSources(payload),
  };
};

export const findCourses = async (params: CourseSearchParams): Promise<CourseSearchResult> => {
  const response = await fetch(COURSE_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...params, type: 'courses' }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch courses. Status: ${response.status}`);
  }

  const payload = await parseJsonResponse(response);
  return normalizeCourses(payload);
};
