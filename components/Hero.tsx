import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section id="top" className="bg-slate-950 relative overflow-hidden pb-36 pt-10">
      <div className="absolute inset-0 opacity-20">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-indigo-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[600px] h-[600px] bg-slate-700 rounded-full mix-blend-multiply filter blur-3xl opacity-25" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10 text-center">
        <div className="inline-flex items-center rounded-full px-3 py-1 text-sm leading-6 text-indigo-100 ring-1 ring-white/15 mb-8 bg-white/5 backdrop-blur-sm">
          <span className="font-semibold text-white">Trusted</span>
          <span className="h-4 w-px bg-white/20 mx-2" />
          <span>Professional scholarship discovery for international students</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
          Secure the Right Scholarship, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-blue-400">with Scholira Intelligence</span>
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-slate-300 font-light leading-relaxed">
          Scholira helps students compare verified scholarship opportunities, review eligibility, and track deadlines in one professional workspace.
        </p>
      </div>
    </section>
  );
};
