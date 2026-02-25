import React from 'react';
import { Scholarship } from '../types';

export const ScholarshipCard: React.FC<{ scholarship: Scholarship }> = ({ scholarship }) => {
  const targetUrl = scholarship.applicationUrl || `https://www.google.com/search?q=${encodeURIComponent(`${scholarship.name} ${scholarship.provider} scholarship official site`)}`;

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">{scholarship.provider}</div>
          <span className="text-xs text-slate-500 font-medium">{scholarship.location}</span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors line-clamp-2">{scholarship.name}</h3>
        <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-5">{scholarship.description}</p>
        <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-slate-100">
          <div><p className="text-xs text-slate-400 uppercase font-semibold mb-1">Value</p><p className="text-sm font-medium text-slate-800">{scholarship.amount}</p></div>
          <div><p className="text-xs text-slate-400 uppercase font-semibold mb-1">Deadline</p><p className="text-sm font-medium text-rose-600">{scholarship.deadline}</p></div>
        </div>
      </div>
      <div className="px-6 py-4 bg-emerald-50/50 border-t border-emerald-100 rounded-b-2xl flex justify-between items-center">
        <span className="text-xs text-slate-500 font-medium">Verified source</span>
        <a href={targetUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-emerald-700 hover:text-emerald-900">Apply / View</a>
      </div>
    </div>
  );
};
