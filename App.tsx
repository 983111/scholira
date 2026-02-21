import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SearchForm } from './components/SearchForm';
import { ScholarshipCard } from './components/ScholarshipCard';
import { Footer } from './components/Footer';
import { LegalSections } from './components/LegalSections';
import { findScholarships, findCourses } from './services/gemini';
import { CourseCard } from './components/CourseCard';
import { SearchParams, SearchResult, CourseSearchResult } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<'scholarships' | 'courses'>('scholarships');
  const [scholarshipResult, setScholarshipResult] = useState<SearchResult | null>(null);
  const [courseResult, setCourseResult] = useState<CourseSearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);
  const [courseQuery, setCourseQuery] = useState('');

  const handleScholarshipSearch = async (params: SearchParams) => {
    setLoading(true);
    setError(null);
    setSearched(true);
    setScholarshipResult(null);

    try {
      const data = await findScholarships(params);
      setScholarshipResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleCourseSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseQuery.trim()) return;

    setLoading(true);
    setError(null);
    setSearched(true);
    setCourseResult(null);

    try {
      const data = await findCourses({ query: courseQuery.trim() });
      setCourseResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const switchTab = (tab: 'scholarships' | 'courses') => {
    setActiveTab(tab);
    setSearched(false);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-indigo-50 flex flex-col">
      <Navbar />
      <Hero />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16">
        <div className="relative z-30 flex justify-center -mt-20 mb-8">
          <div className="bg-white/90 backdrop-blur-lg p-1.5 rounded-2xl border border-indigo-100 inline-flex shadow-xl">
            <button onClick={() => switchTab('scholarships')} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'scholarships' ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-md' : 'text-slate-700 hover:bg-slate-100'}`}>Scholarships</button>
            <button onClick={() => switchTab('courses')} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'courses' ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-md' : 'text-slate-700 hover:bg-slate-100'}`}>Online Courses</button>
          </div>
        </div>

        {activeTab === 'scholarships' ? (
          <SearchForm onSearch={handleScholarshipSearch} isLoading={loading} />
        ) : (
          <div id="search" className="bg-white rounded-2xl shadow-xl border border-indigo-100 p-6 md:p-8 max-w-4xl mx-auto relative z-10">
            <h3 className="font-bold text-slate-900 mb-1">Find Professional Courses</h3>
            <p className="text-sm text-slate-600 mb-5">Get practical courses from top global providers based on your goals.</p>
            <form onSubmit={handleCourseSearch} className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="What do you want to learn? (AI, Python, Product Management...)"
                className="w-full rounded-xl border-indigo-100 py-3 px-4 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                value={courseQuery}
                onChange={(e) => setCourseQuery(e.target.value)}
                required
              />
              <button type="submit" disabled={loading} className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-8 py-3 rounded-xl font-semibold hover:opacity-95 disabled:opacity-50 transition-opacity shadow-md whitespace-nowrap">
                {loading ? 'Searching...' : 'Search Courses'}
              </button>
            </form>
          </div>
        )}

        {error && <div className="mt-8 bg-red-50 border border-red-200 p-4 text-red-700 rounded-xl shadow-sm">{error}</div>}

        {searched && !loading && !error && (
          <section className="mt-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              {activeTab === 'scholarships' ? 'Scholarship Opportunities' : 'Recommended Courses'}
            </h2>

            {activeTab === 'scholarships' && scholarshipResult && (
              <>
                {scholarshipResult.scholarships.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {scholarshipResult.scholarships.map((scholarship, index) => (
                      <ScholarshipCard key={`${scholarship.name}-${index}`} scholarship={scholarship} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 prose prose-slate max-w-none">
                    <p className="text-slate-600 mb-4">No structured scholarship cards found for this query.</p>
                    {scholarshipResult.rawText && <div className="whitespace-pre-wrap text-slate-800">{scholarshipResult.rawText}</div>}
                  </div>
                )}

                {scholarshipResult.sources && scholarshipResult.sources.length > 0 && (
                  <div className="mt-8 bg-white border border-indigo-100 rounded-xl p-5">
                    <p className="text-sm font-semibold text-slate-900 mb-2">Sources</p>
                    <ul className="space-y-1 text-sm text-indigo-700">
                      {scholarshipResult.sources.slice(0, 5).map((source) => (
                        <li key={source.uri}>
                          <a href={source.uri} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {source.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            {activeTab === 'courses' && courseResult && (
              <>
                {courseResult.courses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {courseResult.courses.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center text-slate-600">
                    No courses found for "{courseQuery}". Try broader keywords.
                  </div>
                )}
              </>
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
