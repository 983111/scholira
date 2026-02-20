import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 pb-40 pt-14">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="hero-grid" width="12" height="12" patternUnits="userSpaceOnUse">
              <path d="M 12 0 L 0 0 0 12" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-8 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm text-slate-100">
          Trusted scholarship discovery platform
        </span>

        <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl">
          Professional scholarship matching for ambitious students.
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300 md:text-xl">
          Scholira helps you shortlist high-fit scholarships, evaluate criteria clearly, and move faster with verified source links and transparent policy guidance.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-200">
          <span className="rounded-full border border-white/20 px-3 py-1">Profile-based matching</span>
          <span className="rounded-full border border-white/20 px-3 py-1">Live source references</span>
          <span className="rounded-full border border-white/20 px-3 py-1">Terms & policy ready</span>
        </div>
      </div>
    </section>
  );
};
