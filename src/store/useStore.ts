import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Scholarship as ApiScholarship, Course } from '../types';

export interface UserProfile {
  name: string;
  gpa: string;
  satScore: string;
  actScore: string;
  interests: string[];
  major: string;
  demographics: string;
  achievements: string;
}

export interface TrackedScholarship extends ApiScholarship {
  id: string;
  status: 'saved' | 'applied' | 'ignored' | 'new';
  matchScore?: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

interface AppState {
  userProfile: UserProfile;
  trackedScholarships: TrackedScholarship[];
  chatHistory: ChatMessage[];
  
  updateProfile: (profile: Partial<UserProfile>) => void;
  trackScholarship: (scholarship: TrackedScholarship) => void;
  updateScholarshipStatus: (id: string, status: TrackedScholarship['status']) => void;
  addChatMessage: (message: ChatMessage) => void;
  clearChat: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      userProfile: {
        name: '',
        gpa: '',
        satScore: '',
        actScore: '',
        interests: [],
        major: '',
        demographics: '',
        achievements: '',
      },
      trackedScholarships: [],
      chatHistory: [],

      updateProfile: (profile) =>
        set((state) => ({ userProfile: { ...state.userProfile, ...profile } })),
      
      trackScholarship: (scholarship) =>
        set((state) => ({ 
          trackedScholarships: [...state.trackedScholarships, scholarship] 
        })),
      
      updateScholarshipStatus: (id, status) =>
        set((state) => ({
          trackedScholarships: state.trackedScholarships.map((s) =>
            s.id === id ? { ...s, status } : s
          ),
        })),

      addChatMessage: (message) =>
        set((state) => ({ chatHistory: [...state.chatHistory, message] })),
      
      clearChat: () => set({ chatHistory: [] }),
    }),
    {
      name: 'scholira-storage',
    }
  )
);
