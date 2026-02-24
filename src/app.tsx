import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { SearchForm } from '@/components/SearchForm';
import { ScholarshipCard } from '@/components/ScholarshipCard';
import { Footer } from '@/components/Footer';
import { LegalSections } from '@/components/LegalSections';
import { findScholarships, findCourses } from '@/services/gemini';
import { CourseCard } from '@/components/CourseCard';
import { SearchParams, SearchResult, CourseSearchResult } from '@/types';

type AppPage = 'search' | 'consultancy' | 'profile';

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

        {error && (
          <div className="mt-8 max-w-4xl mx-auto rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 text-sm">
            {error}
          </div>
        )}

        {searched && !loading && (
          <section className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {activeTab === 'scholarships' && scholarshipResult?.scholarships.map((s, i) => <ScholarshipCard key={i} scholarship={s} />)}
              {activeTab === 'courses' && courseResult?.courses.map((c) => <CourseCard key={c.id} course={c} />)}
            </div>
            {activeTab === 'scholarships' && (scholarshipResult?.scholarships?.length ?? 0) === 0 && (
              <p className="text-center text-slate-500 mt-6">No scholarships found for this search. Try changing your criteria.</p>
            )}
            {activeTab === 'courses' && (courseResult?.courses?.length ?? 0) === 0 && (
              <p className="text-center text-slate-500 mt-6">No courses found for this query. Try broader keywords.</p>
            )}
          </section>
        )}
        <LegalSections />
      </main>
    </>
  );
}

function ConsultancyPage() {
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<{ from: 'you' | 'advisor'; text: string }[]>([
    {
      from: 'advisor',
      text: 'Welcome to Scholira Consultancy. Tell me your target major and countries, and I can suggest a strategy.',
    },
  ]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;

    setHistory((prev) => [
      ...prev,
      { from: 'you', text: trimmed },
      {
        from: 'advisor',
        text: 'Thanks! Based on that, prioritize scholarships with partial funding + low application fees, and prepare a strong SOP draft early.',
      },
    ]);
    setMessage('');
  };

  return (
    <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10">
      <div className="bg-white rounded-2xl border border-indigo-100 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-indigo-100 bg-indigo-50/40">
          <h1 className="text-xl font-bold text-slate-900">Consultancy</h1>
          <p className="text-sm text-slate-600 mt-1">Talk to a Scholira advisor assistant for planning guidance.</p>
        </div>
        <div className="p-6 space-y-4 max-h-[420px] overflow-y-auto bg-slate-50/40">
          {history.map((item, idx) => (
            <div key={idx} className={`rounded-xl px-4 py-3 text-sm max-w-3xl ${item.from === 'you' ? 'ml-auto bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-700'}`}>
              {item.text}
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="p-4 border-t border-indigo-100 flex gap-3 bg-white">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about admissions strategy..."
            className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <button type="submit" className="rounded-xl bg-indigo-600 text-white px-5 py-2.5 font-semibold hover:bg-indigo-700">
            Send
          </button>
        </form>
      </div>
    </main>
  );
}

function ProfilePage() {
  return (
    <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10">
      <div className="bg-white rounded-2xl border border-indigo-100 shadow-xl p-8">
        <h1 className="text-xl font-bold text-slate-900">Profile</h1>
        <p className="text-sm text-slate-600 mt-1 mb-6">Save your academic background for personalized recommendations.</p>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input placeholder="Full name" className="rounded-xl border border-slate-200 px-4 py-2.5" />
          <input placeholder="Target major" className="rounded-xl border border-slate-200 px-4 py-2.5" />
          <input placeholder="GPA" className="rounded-xl border border-slate-200 px-4 py-2.5" />
          <input placeholder="SAT/ACT score" className="rounded-xl border border-slate-200 px-4 py-2.5" />
          <textarea placeholder="Achievements" className="md:col-span-2 rounded-xl border border-slate-200 px-4 py-2.5 min-h-28" />
          <textarea placeholder="Interests (comma separated)" className="md:col-span-2 rounded-xl border border-slate-200 px-4 py-2.5 min-h-24" />
          <button type="button" className="md:col-span-2 rounded-xl bg-indigo-600 text-white py-3 font-semibold hover:bg-indigo-700">Save Profile</button>
        </form>
      </div>
    </main>
  );
}

function getPageFromHash(): AppPage {
  const hash = window.location.hash.replace('#', '').toLowerCase();
  if (hash === 'consultancy') return 'consultancy';
  if (hash === 'profile') return 'profile';
  return 'search';
}

function App() {
  const [page, setPage] = useState<AppPage>(getPageFromHash());

  useEffect(() => {
    const onHashChange = () => setPage(getPageFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (next: AppPage) => {
    window.location.hash = next === 'search' ? '' : next;
    setPage(next);
  };

  return (
    <div id="top" className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-indigo-50 flex flex-col">
      <Navbar currentPage={page} onNavigate={navigate} />
      {page === 'search' && <MainSearch />}
      {page === 'consultancy' && <ConsultancyPage />}
      {page === 'profile' && <ProfilePage />}
      <Footer />
    </div>
  );
}

export default App;
