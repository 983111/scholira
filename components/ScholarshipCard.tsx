import React from 'react';
import { Scholarship } from '../types';

export const ScholarshipCard: React.FC<{ scholarship: Scholarship }> = ({ scholarship }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col h-full group">
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
            {scholarship.provider}
          </div>
          <span className="text-xs text-slate-500 font-medium flex items-center">
             <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
             </svg>
            {scholarship.location}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-indigo-700 transition-colors line-clamp-2">
          {scholarship.name}
        </h3>
        
        <div className="mb-5">
          <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">{scholarship.description}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-slate-50">
          <div>
            <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Value</p>
            <p className="text-sm font-medium text-slate-800">{scholarship.amount}</p>
          </div>
          <div>
             <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Deadline</p>
             <p className="text-sm font-medium text-red-600">{scholarship.deadline}</p>
          </div>
        </div>

        {scholarship.eligibility && scholarship.eligibility.length > 0 && (
            <div className="mb-2">
                <div className="flex flex-wrap gap-2">
                    {scholarship.eligibility.slice(0, 3).map((item, idx) => (
                        <span key={idx} className="inline-flex items-center px-2 py-1 rounded text-xs text-slate-600 bg-slate-50 border border-slate-100">
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        )}
      </div>
      
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-xl flex justify-between items-center group-hover:bg-indigo-50/30 transition-colors">
        <span className="text-xs text-slate-400 font-medium">Verified by AI</span>
        <a href={`https://www.google.com/search?q=${encodeURIComponent(`${scholarship.name} ${scholarship.provider} scholarship official site`)}`} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center transition-colors">
          View Program
          <svg className="ml-1.5 h-4 w-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
};
