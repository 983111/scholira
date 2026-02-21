import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-indigo-100 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Scholira</h3>
            <p className="text-slate-600 text-sm max-w-xs">Professional platform to discover scholarships and career-ready online courses with confidence.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#search" className="hover:text-indigo-700">Search</a></li>
              <li><a href="#features" className="hover:text-indigo-700">Features</a></li>
              <li><a href="#legal" className="hover:text-indigo-700">Legal Center</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#privacy-policy" className="hover:text-indigo-700">Privacy Policy</a></li>
              <li><a href="#terms-of-service" className="hover:text-indigo-700">Terms and Conditions</a></li>
              <li><a href="#disclaimer-policy" className="hover:text-indigo-700">Disclaimer</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
