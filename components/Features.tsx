import React from 'react';
import { Smartphone, Filter, LayoutDashboard, Globe, ShieldCheck, Zap } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Product & Unique Value
          </h2>
          <p className="mt-4 text-xl text-slate-500">
            Why GrantFocus is better than Telegram channels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Unique Value Props */}
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 col-span-1 md:col-span-3 lg:col-span-1 lg:row-span-2 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Why Us?</h3>
            <ul className="space-y-6">
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Globe className="h-6 w-6 text-brand-600" />
                </div>
                <div className="ml-3">
                  <h4 className="text-lg font-medium text-slate-900">Localized for Uzbekistan</h4>
                  <p className="text-slate-500 mt-1">Tailored specifically for the Central Asian education system and constraints.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <ShieldCheck className="h-6 w-6 text-brand-600" />
                </div>
                <div className="ml-3">
                  <h4 className="text-lg font-medium text-slate-900">Verified Data Only</h4>
                  <p className="text-slate-500 mt-1">We manually and algorithmically verify every opportunity.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Zap className="h-6 w-6 text-brand-600" />
                </div>
                <div className="ml-3">
                  <h4 className="text-lg font-medium text-slate-900">AI Matching</h4>
                  <p className="text-slate-500 mt-1">Don't search. Get matched.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Product Features */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-brand-300 transition-colors group">
            <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-600 transition-colors">
              <Smartphone className="h-6 w-6 text-brand-600 group-hover:text-white transition-colors" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">Web & Mobile App</h4>
            <p className="text-slate-500">Accessible anywhere. Apply from your phone or manage detailed applications on desktop.</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-brand-300 transition-colors group">
            <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-600 transition-colors">
              <Filter className="h-6 w-6 text-brand-600 group-hover:text-white transition-colors" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">Smart Filters</h4>
            <p className="text-slate-500">Filter by GPA, major, destination country, and funding type instantly.</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-brand-300 transition-colors group md:col-start-2">
            <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-600 transition-colors">
              <LayoutDashboard className="h-6 w-6 text-brand-600 group-hover:text-white transition-colors" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">Personal Dashboard</h4>
            <p className="text-slate-500">Track application statuses, saved grants, and upcoming deadlines in one view.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;