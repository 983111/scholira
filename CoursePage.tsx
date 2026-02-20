// CoursesPage.tsx
import React, { useState } from 'react';
import { CourseCard } from './components/CourseCard';
import { Button } from './components/Button';
import { findCourses } from './services/courses';
import { Course } from './types';

export const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setSearched(true);
    try {
      const data = await findCourses({ query });
      setCourses(data.courses || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Professional Skills & <span className="text-indigo-600">Certifications</span>
        </h2>
        <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
          Upskill with verified courses from Harvard, MIT, Google, and more.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-6 mb-12 max-w-4xl mx-auto">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <input
              type="text"
              placeholder="What do you want to learn? (e.g. AI, Python, Marketing)"
              className="w-full rounded-lg border-slate-300 py-4 px-5 text-slate-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Button type="submit" isLoading={loading} className="md:w-48 shadow-lg shadow-indigo-100">
            Search Courses
          </Button>
        </form>
      </div>

      {searched && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.length > 0 ? (
            courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))
          ) : !loading && (
            <div className="col-span-full text-center py-20 bg-white rounded-xl border border-slate-200">
               <p className="text-slate-500">No courses found matching "{query}". Try a broader term.</p>
            </div>
          )}
        </div>
      )}
      
      {!searched && (
        <div className="text-center py-20 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-medium">Use the search bar above to explore online learning opportunities.</p>
        </div>
      )}
    </div>
  );
};
