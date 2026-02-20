export interface Scholarship {
  name: string;
  provider: string;
  amount: string;
  deadline: string;
  description: string;
  eligibility: string[];
  location: string;
}

// --- NEW ADDITIONS FOR COURSES ---
export interface Course {
  id: string;
  name: string;
  provider: string;
  subject: string;
  level: string;
  duration: string;
  cost: string;
  description: string;
  skills: string[];
  tags: string[];
}

export interface SearchParams {
  // Common params
  query?: string; // Added for generic search
  originCountry?: string;
  studyLevel?: string;
  fieldOfStudy?: string;
  targetRegion?: string;
  gpa?: string;
  sat?: string;
  ielts?: string;
  toefl?: string;
  // Course specific
  subject?: string;
  level?: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface SearchResult {
  scholarships?: Scholarship[];
  courses?: Course[]; // Added courses to result
  total?: number;
  rawText?: string;
  sources?: GroundingSource[];
}
