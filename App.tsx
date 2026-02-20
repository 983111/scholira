import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SearchForm } from './components/SearchForm';
import { ScholarshipCard } from './components/ScholarshipCard';
import { Footer } from './components/Footer';
import { LegalSections } from './components/LegalSections';
import { findScholarships } from './services/gemini';
import { SearchParams, SearchResult } from './types';

function App() {
  const [result, setResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (params: SearchParams) => {
    setLoading(true);
    setError(null);
    setSearched(true);
    setResult(null);

    try {
      const data = await findScholarships(params);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching scholarships. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Navbar />
      <Hero />

      <main className="mx-auto w-full max-w-7xl flex-grow px-4 pb-16 sm:px-6 lg:px-8">
        <SearchForm onSearch={handleSearch} isLoading={loading} />

        {error && (
          <div className="mt-8 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            {error}
          </div>
        )}

        {searched && !loading && !error && result && (
          <section id="results" className="mt-12">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-bold text-slate-900">
                {result.scholarships.length > 0 ? 'Scholarship Opportunities' : 'Search Results'}
              </h2>
              <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                Powered by Google Gemini
              </span>
            </div>

            {result.scholarships.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {result.scholarships.map((scholarship, index) => (
                  <ScholarshipCard key={index} scholarship={scholarship} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                <p className="mb-4 text-slate-600">We found information but could not format it as cards. Raw result:</p>
                <div className="whitespace-pre-wrap text-slate-800">{result.rawText}</div>
              </div>
            )}

            {result.sources && result.sources.length > 0 && (
              <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-900">Verified Sources</h3>
                <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {result.sources.map((source, idx) => (
                    <li key={idx}>
                      <a href={source.uri} target="_blank" rel="noopener noreferrer" className="truncate text-sm text-blue-700 hover:underline">
                        {source.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {!searched && !loading && (
          <section id="features" className="mt-16">
            <h3 className="text-center text-2xl font-bold text-slate-900">Why use Scholira?</h3>
            <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-600">Built for students who need reliable scholarship intelligence with a clean, professional workflow.</p>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h4 className="font-semibold text-slate-900">Smart Matching</h4>
                <p className="mt-2 text-sm text-slate-600">AI identifies scholarships aligned with your country, level, and study interests.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h4 className="font-semibold text-slate-900">Deadline Clarity</h4>
                <p className="mt-2 text-sm text-slate-600">See values and timelines clearly to prioritize the right opportunities quickly.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h4 className="font-semibold text-slate-900">Policy Transparency</h4>
                <p className="mt-2 text-sm text-slate-600">Terms, privacy, and disclaimer sections are integrated and accessible at all times.</p>
              </div>
            </div>
          </section>
        )}

        <LegalSections />
      </main>

      <Footer />
    </div>
  );
}

export default App;
