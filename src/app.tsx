import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SearchForm } from './components/SearchForm';
import { ScholarshipCard } from './components/ScholarshipCard';
import { Footer } from './components/Footer';
import { LegalSections } from './components/LegalSections';
import { findScholarships, findCourses } from './services/gemini';
import { CourseCard } from './components/CourseCard';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import { SearchParams, SearchResult, CourseSearchResult } from './types';

function MainSearch() {
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
      // Maintaining your existing Cloudflare Worker API call
      const data = await findScholarships(params);
      setScholarshipResult(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
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
      // Maintaining your existing Cloudflare Worker API call
      const data = await findCourses({ query: courseQuery.trim() });
      setCourseResult(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Hero />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16">
        <div className="relative z-30 flex justify-center -mt-20 mb-8">
          <div className="bg-white/90 backdrop-blur-lg p-1.5 rounded-2xl border border-indigo-100 inline-flex shadow-xl">
            <button onClick={() => setActiveTab('scholarships')} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'scholarships' ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-md' : 'text-slate-700 hover:bg-slate-100'}`}>Scholarships</button>
            <button onClick={() => setActiveTab('courses')} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'courses' ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-md' : 'text-slate-700 hover:bg-slate-100'}`}>Online Courses</button>
          </div>
        </div>

        {activeTab === 'scholarships' ? (
          <SearchForm onSearch={handleScholarshipSearch} isLoading={loading} />
        ) : (
          <div className="bg-white rounded-2xl shadow-xl border border-indigo-100 p-8 max-w-4xl mx-auto relative z-10">
            <h3 className="font-bold text-slate-900 mb-1">Find Professional Courses</h3>
            <form onSubmit={handleCourseSearch} className="flex flex-col sm:flex-row gap-4 mt-5">
              <input
                type="text"
                placeholder="What do you want to learn?"
                className="w-full rounded-xl border-indigo-100 py-3 px-4 focus:ring-indigo-500"
                value={courseQuery}
                onChange={(e) => setCourseQuery(e.target.value)}
              />
              <button type="submit" disabled={loading} className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-8 py-3 rounded-xl font-bold">
                {loading ? 'Searching...' : 'Search'}
              </button>
            </form>
          </div>
        )}

        {searched && !loading && (
          <section className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {activeTab === 'scholarships' && scholarshipResult?.scholarships.map((s, i) => <ScholarshipCard key={i} scholarship={s} />)}
              {activeTab === 'courses' && courseResult?.courses.map((c) => <CourseCard key={c.id} course={c} />)}
            </div>
          </section>
        )}
        <LegalSections />
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-indigo-50 flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<MainSearch />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
