import React from 'react';
import { Course } from '../types';

export const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col h-full group">
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
            {course.provider}
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {course.level}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-indigo-700 transition-colors line-clamp-2">
          {course.name}
        </h3>
        
        <div className="mb-5">
          <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
            {course.description}
          </p>
        </div>
        
        {course.skills && course.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {course.skills.slice(0, 4).map((skill, idx) => (
              <span key={idx} className="px-2 py-0.5 bg-slate-100 text-[10px] font-bold text-slate-500 uppercase rounded">
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
          <div>
            <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Cost</p>
            <p className="text-sm font-medium text-slate-800">{course.cost}</p>
          </div>
          <div>
             <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Duration</p>
             <p className="text-sm font-medium text-slate-800">{course.duration}</p>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-xl flex justify-between items-center group-hover:bg-indigo-50/30 transition-colors">
        <span className="text-xs text-slate-400 font-medium">Verified by AI</span>
        <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center transition-colors">
          View Course
          <svg className="ml-1.5 h-4 w-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};
