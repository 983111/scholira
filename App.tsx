import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SearchForm } from './components/SearchForm';
import { ScholarshipCard } from './components/ScholarshipCard';
import { Footer } from './components/Footer';
import { LegalSections } from './components/LegalSections';
import { findScholarships } from './services/gemini';
import { SearchParams, SearchResult, Course } from './types';
// Removed missing imports to fix build
// import { CoursesPage } from './CoursesPage'; 

// --- Inline Course Card Component ---
const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col h-full group">
    <div className="p-6 flex-1">
      <div className="flex justify-between items-start mb-4">
        <div className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
          {course.provider}
        </div>
        <span className="text-xs text-slate-500 font-medium">{course.level}</span>
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-700 transition-colors line-clamp-2">
        {course.name}
      </h3>
      <p className="text-sm text-slate-600 line-clamp-2 mb-4">{course.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-6">
        {course.skills?.slice(0, 4).map((skill, idx) => (
          <span key={idx} className="px-2 py-0.5 bg-slate-100 text-[10px] font-bold text-slate-500 uppercase rounded">
            {skill}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
        <div><p className="text-xs text-slate-400 uppercase font-semibold mb-0.5">Cost</p><p className="text-sm font-medium text-slate-800">{course.cost}</p></div>
        <div><p className="text-xs text-slate-400 uppercase font-semibold mb-0.5">Duration</p><p className="text-sm font-medium text-slate-800">{course.duration}</p></div>
      </div>
    </div>
    <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-xl">
      <button className="w-full text-center text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">Enroll via Platform</button>
    </div>
  </div>
);

function App() {
  const [activeTab, setActiveTab] = useState<'scholarships' | 'courses'>('scholarships');
  const [result, setResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);
  const [courseQuery, setCourseQuery] = useState('');

  // Unified Search Handler
  const handleSearch = async (params: SearchParams) => {
    setLoading(true);
    setError(null);
    setSearched(true);
    setResult(null);

    try {
      // Use the existing service but pass a flag or different params based on tab
      const searchData = { 
        ...params, 
        type: activeTab // Tell backend which type to search
      };
      
      const data = await findScholarships(searchData);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleCourseSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(!courseQuery.trim()) return;
    handleSearch({ query: courseQuery, studyLevel: 'Any', originCountry: 'Any', fieldOfStudy: courseQuery, targetRegion: 'Any' });
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <Hero />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16">
        
        {/* Tab Switcher */}
        <div className="relative z-30 flex justify-center -mt-28 mb-10">
          <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-xl border border-white/20 inline-flex shadow-xl">
            <button onClick={() => { setActiveTab('scholarships'); setSearched(false); }} className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'scholarships' ? 'bg-white text-indigo-700 shadow-sm' : 'text-white/80 hover:bg-white/10'}`}>Scholarships</button>
            <button onClick={() => { setActiveTab('courses'); setSearched(false); }} className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'courses' ? 'bg-white text-indigo-700 shadow-sm' : 'text-white/80 hover:bg-white/10'}`}>Online Courses</button>
          </div>
        </div>

        {activeTab === 'scholarships' ? (
          <SearchForm onSearch={handleSearch} isLoading={loading} />
        ) : (
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-6 md:p-8 max-w-4xl mx-auto -mt-20 relative z-10">
            <form onSubmit={handleCourseSearch} className="flex gap-4">
              <input 
                type="text" 
                placeholder="What do you want to learn? (e.g. AI, Python)" 
                className="w-full rounded-lg border-slate-300 py-3 px-4 focus:ring-indigo-500 focus:border-indigo-500"
                value={courseQuery}
                onChange={(e) => setCourseQuery(e.target.value)}
              />
              <button type="submit" disabled={loading} className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50">
                {loading ? 'Searching...' : 'Search'}
              </button>
            </form>
          </div>
        )}

        {error && (
          <div className="mt-8 bg-red-50 border-l-4 border-red-400 p-4 text-red-700">{error}</div>
        )}

        {searched && !loading && !error && result && (
          <section className="mt-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              {activeTab === 'scholarships' ? 'Scholarship Opportunities' : 'Recommended Courses'}
            </h2>
            
            {activeTab === 'scholarships' && result.scholarships && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {result.scholarships.map((scholarship, index) => (
                  <ScholarshipCard key={index} scholarship={scholarship} />
                ))}
              </div>
            )}

            {activeTab === 'courses' && result.courses && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {result.courses.map((course, index) => (
                  <CourseCard key={index} course={course} />
                ))}
              </div>
            )}
            
            {((activeTab === 'scholarships' && (!result.scholarships || result.scholarships.length === 0)) ||
              (activeTab === 'courses' && (!result.courses || result.courses.length === 0))) && (
              <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 text-center text-slate-600">
                No results found. Try adjusting your search terms.
              </div>
            )}
          </section>
        )}

        <LegalSections />
      </main>
      <Footer />
    </div>
  );
}

export default App;
