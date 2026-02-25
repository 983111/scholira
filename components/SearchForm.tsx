import React, { useState } from 'react';
import { SearchParams } from '../types';
import { Button } from './Button';

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [params, setParams] = useState<SearchParams>({
    originCountry: 'Uzbekistan',
    studyLevel: "Bachelor's Degree",
    fieldOfStudy: '',
    targetRegion: 'Europe',
    gpa: '',
    sat: '',
    ielts: '',
    toefl: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(params);
  };

  const inputClasses = 'block w-full rounded-xl border-emerald-100 py-3 px-4 text-slate-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm bg-white placeholder-slate-400';
  const labelClasses = 'block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5';

  return (
    <div id="search" className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-6 md:p-8 max-w-5xl mx-auto relative z-10">
      <form onSubmit={handleSubmit} className="space-y-8" aria-label="Scholarship search form">
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-4 pb-2 border-b border-emerald-100">Target & Background</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div><label htmlFor="originCountry" className={labelClasses}>Citizenship</label><select id="originCountry" name="originCountry" value={params.originCountry} onChange={handleChange} className={inputClasses}><option value="Uzbekistan">Uzbekistan</option><option value="Kazakhstan">Kazakhstan</option><option value="Kyrgyzstan">Kyrgyzstan</option><option value="Tajikistan">Tajikistan</option><option value="Vietnam">Vietnam</option><option value="India">India</option><option value="International">International</option></select></div>
            <div><label htmlFor="studyLevel" className={labelClasses}>Level</label><select id="studyLevel" name="studyLevel" value={params.studyLevel} onChange={handleChange} className={inputClasses}><option value="High School">High School</option><option value="Bachelor's Degree">Bachelor's Degree</option><option value="Master's Degree">Master's Degree</option><option value="PhD">PhD / Doctorate</option></select></div>
            <div><label htmlFor="targetRegion" className={labelClasses}>Destination</label><select id="targetRegion" name="targetRegion" value={params.targetRegion} onChange={handleChange} className={inputClasses}><option value="Anywhere globally">Anywhere globally</option><option value="Europe">Europe</option><option value="USA & Canada">USA & Canada</option><option value="UK">United Kingdom</option><option value="Asia">Asia</option></select></div>
            <div><label htmlFor="fieldOfStudy" className={labelClasses}>Field of Study</label><input type="text" id="fieldOfStudy" name="fieldOfStudy" required placeholder="e.g. Computer Science" value={params.fieldOfStudy} onChange={handleChange} className={inputClasses} /></div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-4 pb-2 border-b border-emerald-100">Score-Based Matching</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div><label htmlFor="gpa" className={labelClasses}>GPA</label><input type="text" id="gpa" name="gpa" placeholder="3.8/4.0" value={params.gpa} onChange={handleChange} className={inputClasses} /></div>
            <div><label htmlFor="sat" className={labelClasses}>SAT</label><input type="text" id="sat" name="sat" placeholder="1450" value={params.sat} onChange={handleChange} className={inputClasses} /></div>
            <div><label htmlFor="ielts" className={labelClasses}>IELTS</label><input type="text" id="ielts" name="ielts" placeholder="7.5" value={params.ielts} onChange={handleChange} className={inputClasses} /></div>
            <div><label htmlFor="toefl" className={labelClasses}>TOEFL</label><input type="text" id="toefl" name="toefl" placeholder="100" value={params.toefl} onChange={handleChange} className={inputClasses} /></div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" isLoading={isLoading} className="w-full md:w-auto min-w-[260px] shadow-lg shadow-emerald-100 text-base py-3.5">Find Scholarships</Button>
        </div>
      </form>
    </div>
  );
};
