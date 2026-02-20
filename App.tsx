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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <Hero />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16">
        <SearchForm onSearch={handleSearch} isLoading={loading} />

        {error && (
          <div className="mt-8 bg-red-50 border-l-4 border-red-400 p-4 rounded-md shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {searched && !loading && !error && result && (
          <section id="results" className="mt-12 animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900">
                {result.scholarships.length > 0 ? 'Scholarship Opportunities' : 'Search Results'}
              </h2>
              <span className="text-sm text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
                Powered by Google Gemini
              </span>
            </div>

            {result.scholarships.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {result.scholarships.map((scholarship, index) => (
                  <ScholarshipCard key={index} scholarship={scholarship} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 prose prose-slate max-w-none">
                <p className="text-slate-600 mb-4">
                  We found some information, but could not format it into cards. Here is what we found:
                </p>
                <div className="whitespace-pre-wrap text-slate-800">{result.rawText}</div>
              </div>
            )}

            {result.sources && result.sources.length > 0 && (
              <div className="mt-12 bg-white p-6 rounded-lg border border-slate-200">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Verified Sources</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {result.sources.map((source, idx) => (
                    <li key={idx}>
                      <a
                        href={source.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-blue-600 hover:text-blue-800 hover:underline truncate"
                      >
                        <svg className="h-4 w-4 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        <span className="truncate">{source.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {!searched && !loading && (
          <section id="features" className="mt-16 text-center">
            <h3 className="text-lg font-medium text-slate-900 mb-2">Why use Scholira?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <h4 className="font-semibold text-slate-800">Smart Search</h4>
                <p className="text-sm text-slate-500 mt-2">Our AI scans active opportunities to match your background and goals.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h4 className="font-semibold text-slate-800">Deadline Awareness</h4>
                <p className="text-sm text-slate-500 mt-2">Stay on track with clear funding deadlines and provider links.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h4 className="font-semibold text-slate-800">Regional Relevance</h4>
                <p className="text-sm text-slate-500 mt-2">Designed for students from Central Asia, Southeast Asia, and global applicants.</p>
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
