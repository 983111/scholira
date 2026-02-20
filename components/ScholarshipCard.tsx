import React from 'react';
import { Scholarship } from '../types';

export const ScholarshipCard: React.FC<{ scholarship: Scholarship }> = ({ scholarship }) => {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex-1 p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{scholarship.provider}</span>
          <span className="inline-flex items-center text-xs font-medium text-slate-500">
            <svg className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {scholarship.location}
          </span>
        </div>

        <h3 className="mb-3 line-clamp-2 text-lg font-bold text-slate-900">{scholarship.name}</h3>
        <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-slate-600">{scholarship.description}</p>

        <dl className="mb-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
          <div><dt className="text-xs font-semibold uppercase text-slate-400">Value</dt><dd className="text-sm font-semibold text-slate-800">{scholarship.amount}</dd></div>
          <div><dt className="text-xs font-semibold uppercase text-slate-400">Deadline</dt><dd className="text-sm font-semibold text-rose-600">{scholarship.deadline}</dd></div>
        </dl>

        {scholarship.eligibility?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {scholarship.eligibility.slice(0, 3).map((item, idx) => (
              <span key={idx} className="inline-flex rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-600">{item}</span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-6 py-4">
        <span className="text-xs font-medium text-slate-400">Source verified</span>
        <a
          href={`https://www.google.com/search?q=${encodeURIComponent(`${scholarship.name} ${scholarship.provider} scholarship official site`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-semibold text-slate-800 hover:text-slate-950"
        >
          View Program
          <svg className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </article>
  );
};
