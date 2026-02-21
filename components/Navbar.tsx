import React from 'react';

export const Navbar: React.FC = () => {
  const linkClasses = 'border-transparent text-slate-700 hover:border-indigo-300 hover:text-indigo-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors';

  return (
    <nav className="bg-white/95 backdrop-blur border-b border-indigo-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <a href="#top" className="flex items-center" aria-label="Go to top">
            <div className="h-9 w-9 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-lg flex items-center justify-center mr-3 shadow-sm">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-slate-900 tracking-tight">Scholira<span className="text-indigo-600">.</span></span>
          </a>

          <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
            <a href="#search" className="border-indigo-500 text-indigo-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Search</a>
            <a href="#features" className={linkClasses}>Features</a>
            <a href="#legal" className={linkClasses}>Legal</a>
          </div>

          <div className="flex items-center space-x-4">
            <a href="#privacy-policy" className="text-sm font-medium text-slate-600 hover:text-indigo-700 transition-colors">Privacy</a>
            <a href="#search" className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:opacity-95 transition-opacity">Start Search</a>
          </div>
        </div>
      </div>
    </nav>
  );
};
