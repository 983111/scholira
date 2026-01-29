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
    studyLevel: 'Bachelor\'s Degree',
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

  const inputClasses = "block w-full rounded-lg border-slate-300 py-3 px-4 text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white transition-colors duration-200 placeholder-slate-400";
  const labelClasses = "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5";
  const sectionHeaderClasses = "text-sm font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center";

  return (
    <div className="bg-white rounded-xl shadow-xl border-t-4 border-indigo-600 p-6 md:p-8 max-w-5xl mx-auto -mt-20 relative z-10">
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Section 1: Core Preferences */}
        <div>
          <h3 className={sectionHeaderClasses}>
            <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Target & Background
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-1">
              <label htmlFor="originCountry" className={labelClasses}>Citizenship</label>
              <select
                id="originCountry"
                name="originCountry"
                value={params.originCountry}
                onChange={handleChange}
                className={inputClasses}
              >
                <optgroup label="Central Asia">
                    <option value="Uzbekistan">Uzbekistan</option>
                    <option value="Kazakhstan">Kazakhstan</option>
                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                    <option value="Tajikistan">Tajikistan</option>
                    <option value="Turkmenistan">Turkmenistan</option>
                </optgroup>
                <optgroup label="Southeast Asia">
                    <option value="Vietnam">Vietnam</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Cambodia">Cambodia</option>
                    <option value="Myanmar">Myanmar</option>
                </optgroup>
                <optgroup label="Other">
                    <option value="India">India</option>
                    <option value="China">China</option>
                    <option value="International">International</option>
                </optgroup>
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="studyLevel" className={labelClasses}>Level</label>
              <select
                id="studyLevel"
                name="studyLevel"
                value={params.studyLevel}
                onChange={handleChange}
                className={inputClasses}
              >
                <option value="High School">High School</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="PhD">PhD / Doctorate</option>
                <option value="Post-Doctorate">Post-Doctorate</option>
                <option value="Vocational Training">Vocational</option>
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="targetRegion" className={labelClasses}>Destination</label>
              <select
                id="targetRegion"
                name="targetRegion"
                value={params.targetRegion}
                onChange={handleChange}
                className={inputClasses}
              >
                <option value="Anywhere globally">Anywhere globally</option>
                <option value="Europe">Europe</option>
                <option value="USA & Canada">USA & Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="Australia & NZ">Australia & NZ</option>
                <option value="Asia">Asia (Korea, Japan, China)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="fieldOfStudy" className={labelClasses}>Field of Study</label>
              <input
                type="text"
                id="fieldOfStudy"
                name="fieldOfStudy"
                required
                placeholder="e.g. Computer Science"
                value={params.fieldOfStudy}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Academic Profile */}
        <div>
           <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
             <h3 className="text-sm font-bold text-slate-900 flex items-center">
              <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Score-Based Matching
            </h3>
            <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded">Required for best results</span>
           </div>
           
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             <div className="space-y-1">
              <label htmlFor="gpa" className={labelClasses}>GPA (e.g. 3.8/4.0)</label>
              <input
                type="text"
                id="gpa"
                name="gpa"
                placeholder="Required for merit"
                value={params.gpa}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="sat" className={labelClasses}>SAT Score (Optional)</label>
              <input
                type="text"
                id="sat"
                name="sat"
                placeholder="e.g. 1450"
                value={params.sat}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="ielts" className={labelClasses}>IELTS (Optional)</label>
              <input
                type="text"
                id="ielts"
                name="ielts"
                placeholder="e.g. 7.5"
                value={params.ielts}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
             <div className="space-y-1">
              <label htmlFor="toefl" className={labelClasses}>TOEFL (Optional)</label>
              <input
                type="text"
                id="toefl"
                name="toefl"
                placeholder="e.g. 100"
                value={params.toefl}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            *We will automatically include universities with need-based financial aid for international students if your profile matches.
          </p>
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" isLoading={isLoading} className="w-full md:w-auto min-w-[300px] shadow-xl shadow-indigo-200 text-base py-4">
            Find Comprehensive List
          </Button>
        </div>

      </form>
    </div>
  );
};
