// App.tsx
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SearchForm } from './components/SearchForm';
import { ScholarshipCard } from './components/ScholarshipCard';
import { Footer } from './components/Footer';
import { CoursesPage } from './CoursesPage';
import { findScholarships } from './services/gemini';
import { SearchParams, SearchResult } from './types';

function App() {
  const [view, setView] = useState<'scholarships' | 'courses'>('scholarships');
  // ... existing states

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar /> {/* You can update Navbar to call setView if needed */}
      
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 flex space-x-8">
          <button 
            onClick={() => setView('scholarships')}
            className={`py-4 text-sm font-semibold border-b-2 transition-colors ${view === 'scholarships' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            Scholarships
          </button>
          <button 
            onClick={() => setView('courses')}
            className={`py-4 text-sm font-semibold border-b-2 transition-colors ${view === 'courses' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            Online Courses
          </button>
        </div>
      </div>

      {view === 'scholarships' ? (
        <>
          <Hero />
          <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16">
            <SearchForm onSearch={handleSearch} isLoading={loading} />
            {/* ... result logic */}
          </main>
        </>
      ) : (
        <main className="flex-grow">
          <CoursesPage />
        </main>
      )}

      <Footer />
    </div>
  );
}
