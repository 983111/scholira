import React, { useState } from 'react';
import { GraduationCap, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <GraduationCap className="h-8 w-8 text-brand-600" />
            <span className="font-bold text-xl text-slate-900 tracking-tight">GrantFocus</span>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#problem" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">Problem</a>
            <a href="#solution" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">Solution</a>
            <a href="#market" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">Market</a>
            <a href="#demo" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">AI Demo</a>
            <button className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2 rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Get Early Access
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-slate-900">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 shadow-xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#problem" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-brand-600 hover:bg-slate-50" onClick={() => setIsOpen(false)}>Problem</a>
            <a href="#solution" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-brand-600 hover:bg-slate-50" onClick={() => setIsOpen(false)}>Solution</a>
            <a href="#market" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-brand-600 hover:bg-slate-50" onClick={() => setIsOpen(false)}>Market</a>
            <a href="#demo" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-brand-600 hover:bg-slate-50" onClick={() => setIsOpen(false)}>AI Demo</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;