import React, { useState } from 'react';
import { CourseCard } from './components/CourseCard';
import { Button } from './components/Button';
import { findCourses } from './services/courses';
import { Course } from './types';
import { LegalSections } from './components/LegalSections';

export const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setSearched(true);
    
    try {
      const data = await findCourses({ query });
      setCourses(data.courses || []);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching courses.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Search Form - Mirrors the styling of SearchForm.tsx exactly */}
      <div id="course-search" className="bg-white rounded-xl shadow-xl border border-slate-200 p-6 md:p-8 max-w-5xl mx-auto -mt-20 relative z-10">
        <div className="mb-6 pb-2 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 flex items-center">
            <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Discover Professional Certifications
          </h3>
          <p className="text-xs text-slate-500 mt-1">Search through top-tier courses from Harvard, MIT, edX, and Coursera.</p>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="e.g., Python, Machine Learning, Business Analytics..."
              className="block w-full rounded-lg border-slate-300 py-3.5 px-4 text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-slate-50 transition-colors duration-200"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
            />
          </div>
          <Button type="submit" isLoading={loading} className="md:w-48 shadow-lg shadow-indigo-200 text-base py-3.5">
            Search Courses
          </Button>
        </form>
      </div>

      {error && (
        <div className="mt-8 bg-red-50 border-l-4 border-red-400 p-4 rounded-md shadow-sm">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {searched && !loading && !error && (
        <section id="results" className="mt-12 animate-fade-in">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">
              {courses.length > 0 ? 'Course Opportunities' : 'No Results Found'}
            </h2>
            <span className="text-sm text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
              Powered by Scholira Engine
            </span>
          </div>

          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 text-center">
              <p className="text-slate-600">No courses matched your search. Try broadening your keywords.</p>
            </div>
          )}
        </section>
      )}

      {!searched && !loading && (
        <section id="features" className="mt-16 text-center">
           <h3 className="text-lg font-medium text-slate-900 mb-2">Enhance your Professional Value</h3>
           <p className="text-sm text-slate-500 max-w-2xl mx-auto">Build high-income skills directly from world-renowned universities.</p>
        </section>
      )}

      <LegalSections />
    </>
  );
};
