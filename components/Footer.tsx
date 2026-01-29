import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Scholara</h3>
            <p className="text-slate-500 text-sm max-w-xs">
              Empowering students from Central and Southeast Asia to achieve their global academic dreams through accessible, AI-curated scholarship information.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Regions</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>Uzbekistan</li>
              <li>Vietnam</li>
              <li>Indonesia</li>
              <li>Global Opportunities</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Disclaimer</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Scholara Global. All rights reserved. Information provided by Google Gemini.
          </p>
        </div>
      </div>
    </footer>
  );
};
