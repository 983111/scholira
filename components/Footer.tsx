import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-950 py-12 text-slate-300">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <h3 className="mb-3 text-lg font-bold text-white">Scholira</h3>
          <p className="max-w-md text-sm text-slate-400">
            Professional scholarship intelligence for international students. Compare options, verify sources, and apply with confidence.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#search" className="hover:text-white">Search</a></li>
            <li><a href="#features" className="hover:text-white">Features</a></li>
            <li><a href="#legal" className="hover:text-white">Legal Center</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#terms-of-service" className="hover:text-white">Terms and Conditions</a></li>
            <li><a href="#privacy-policy" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#disclaimer-policy" className="hover:text-white">Disclaimer</a></li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl border-t border-slate-800 px-4 pt-6 text-center text-xs text-slate-500 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} Scholira Global. All rights reserved. Scholarship data should be independently verified on official sources.
      </div>
    </footer>
  );
};
