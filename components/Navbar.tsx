import React from 'react';

export const Navbar: React.FC = () => {
  const navLink = 'inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors';

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center" aria-label="Go to top">
          <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 shadow-sm">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">Scholira</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#search" className={navLink}>Search</a>
          <a href="#features" className={navLink}>Features</a>
          <a href="#legal" className={navLink}>Legal</a>
        </div>

        <div className="flex items-center gap-3">
          <a href="#privacy-policy" className="hidden text-sm font-medium text-slate-500 hover:text-slate-900 sm:inline">Privacy</a>
          <a href="#search" className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
            Find Scholarships
          </a>
        </div>
      </div>
    </nav>
  );
};
