// components/CourseCard.tsx
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
        
        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-700 transition-colors">
          {course.name}
        </h3>
        
        <p className="text-sm text-slate-600 line-clamp-2 mb-4">
          {course.description}
        </p>
        
        <div className="flex flex-wrap gap-1.5 mb-6">
          {course.skills.map((skill, idx) => (
            <span key={idx} className="px-2 py-0.5 bg-slate-100 text-[10px] font-bold text-slate-500 uppercase rounded">
              {skill}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
          <div>
            <p className="text-xs text-slate-400 uppercase font-semibold mb-0.5">Cost</p>
            <p className="text-sm font-medium text-slate-800">{course.cost}</p>
          </div>
          <div>
             <p className="text-xs text-slate-400 uppercase font-semibold mb-0.5">Duration</p>
             <p className="text-sm font-medium text-slate-800">{course.duration}</p>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-xl">
        <button className="w-full text-center text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
          Enroll via Platform
        </button>
      </div>
    </div>
  );
};
