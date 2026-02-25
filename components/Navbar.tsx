import React from 'react';

type AppPage = 'search' | 'consultancy' | 'profile';

interface NavbarProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const baseLink = 'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors';
  const inactiveLink = `${baseLink} border-transparent text-slate-700 hover:border-emerald-300 hover:text-emerald-700`;
  const activeLink = `${baseLink} border-emerald-500 text-emerald-700`;

  return (
    <nav className="bg-white/95 backdrop-blur border-b border-emerald-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <button type="button" onClick={() => onNavigate('search')} className="flex items-center" aria-label="Go to home">
            <div className="h-9 w-9 bg-gradient-to-br from-emerald-700 to-teal-600 rounded-lg flex items-center justify-center mr-3 shadow-sm">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-slate-900 tracking-tight">Scholira<span className="text-emerald-600">.</span></span>
          </button>

          <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
            <button type="button" onClick={() => onNavigate('search')} className={currentPage === 'search' ? activeLink : inactiveLink}>Search</button>
            <button type="button" onClick={() => onNavigate('consultancy')} className={currentPage === 'consultancy' ? activeLink : inactiveLink}>Consultancy</button>
            <button type="button" onClick={() => onNavigate('profile')} className={currentPage === 'profile' ? activeLink : inactiveLink}>Profile</button>
          </div>

          <div className="flex items-center space-x-4">
            <button type="button" onClick={() => onNavigate('profile')} className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors">My Profile</button>
            <button type="button" onClick={() => onNavigate('consultancy')} className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-emerald-700 to-teal-600 hover:opacity-95 transition-opacity">Open Consultancy</button>
          </div>
        </div>
      </div>
    </nav>
  );
};
