export interface Scholarship {
  name: string;
  provider: string;
  amount: string;
  deadline: string;
  description: string;
  eligibility: string[];
  location: string;
  applicationUrl?: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface SearchParams {
  originCountry: string;
  studyLevel: string;
  fieldOfStudy: string;
  targetRegion: string;
  gpa?: string;
  sat?: string;
  ielts?: string;
  toefl?: string;
}

export interface SearchResult {
  scholarships: Scholarship[];
  rawText?: string;
  sources?: GroundingSource[];
}

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
  link?: string;
}

export interface CourseSearchParams {
  query: string;
  subject?: string;
  level?: string;
}

export interface CourseSearchResult {
  courses: Course[];
  total: number;
}
