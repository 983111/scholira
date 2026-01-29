import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center cursor-pointer">
              {/* Logo Icon */}
              <div className="h-9 w-9 bg-indigo-700 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-slate-900 tracking-tight">Scholara<span className="text-indigo-600">.</span></span>
            </div>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <a href="#" className="border-indigo-600 text-slate-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Search
              </a>
              <a href="#" className="border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Institutions
              </a>
              <a href="#" className="border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Insights
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
             <button className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Log in</button>
             <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-slate-900 hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Get Started
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
