export interface Scholarship {
  name: string;
  provider: string;
  amount: string;
  deadline: string;
  description: string;
  eligibility: string[];
  location: string;
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
}

export interface SearchParams {
  type?: 'scholarships' | 'courses';
  query?: string;
  originCountry?: string;
  studyLevel?: string;
  fieldOfStudy?: string;
  targetRegion?: string;
  gpa?: string;
  sat?: string;
  ielts?: string;
  toefl?: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface SearchResult {
  scholarships?: Scholarship[];
  courses?: Course[];
  total?: number;
  totalFound?: number;
  rawText?: string;
  sources?: GroundingSource[];
}
