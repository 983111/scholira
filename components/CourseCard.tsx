import React from 'react';
import { Course } from '../types';

export const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <div className="bg-white rounded-2xl border border-teal-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-100">{course.provider}</div>
          <span className="text-xs text-slate-500 font-medium">{course.level}</span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-teal-700 transition-colors line-clamp-2">{course.name}</h3>
        <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-5">{course.description}</p>
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          <div><p className="text-xs text-slate-400 uppercase font-semibold mb-1">Cost</p><p className="text-sm font-medium text-slate-800">{course.cost}</p></div>
          <div><p className="text-xs text-slate-400 uppercase font-semibold mb-1">Duration</p><p className="text-sm font-medium text-slate-800">{course.duration}</p></div>
        </div>
      </div>
      <div className="px-6 py-4 bg-teal-50/50 border-t border-teal-100 rounded-b-2xl flex justify-between items-center">
        <span className="text-xs text-slate-500 font-medium">Provider listing</span>
        {course.link ? (
          <a href={course.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-teal-700 hover:text-teal-900">View Course</a>
        ) : (
          <span className="text-sm font-semibold text-slate-400">No direct link</span>
        )}
      </div>
    </div>
  );
};
