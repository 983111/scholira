import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:justify-between items-center">
          <div className="mb-8 md:mb-0">
            <span className="font-bold text-xl text-slate-900 tracking-tight">GrantFocus</span>
            <p className="text-slate-500 mt-2 text-sm">Empowering students in Uzbekistan to reach global heights.</p>
          </div>
          <div className="flex space-x-6 text-sm text-slate-500">
            <a href="#" className="hover:text-brand-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-brand-600 transition-colors">Contact</a>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-100 pt-8 text-center text-xs text-slate-400">
          &copy; {new Date().getFullYear()} GrantFocus. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;