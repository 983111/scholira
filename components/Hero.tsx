import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section id="top" className="relative overflow-hidden pb-24 pt-10 bg-gradient-to-br from-indigo-600 via-blue-500 to-cyan-400">
      <div className="absolute inset-0 opacity-30">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16 relative z-10 text-center">
        <div className="inline-flex items-center rounded-full px-3 py-1 text-sm text-white ring-1 ring-white/40 mb-8 bg-white/10 backdrop-blur-sm">
          Scholarship + Course Discovery in one platform
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
          Build Your Future with <br />
          <span className="text-cyan-100">Brighter Global Opportunities</span>
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-indigo-50 leading-relaxed">
          Scholira connects students with verified scholarships and professional courses through smart search and reliable backend data.
        </p>
      </div>
    </section>
  );
};
