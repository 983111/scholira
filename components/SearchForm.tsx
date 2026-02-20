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

  const inputClasses = 'block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-600 focus:ring-2 focus:ring-slate-200';
  const labelClasses = 'mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500';
  const sectionTitle = 'mb-4 flex items-center border-b border-slate-200 pb-2 text-sm font-semibold text-slate-900';

  return (
    <section id="search" className="relative z-10 mx-auto -mt-20 max-w-6xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-300/30 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-8" aria-label="Scholarship search form">
        <div>
          <h3 className={sectionTitle}>Academic Target Profile</h3>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label htmlFor="originCountry" className={labelClasses}>Citizenship</label>
              <select id="originCountry" name="originCountry" value={params.originCountry} onChange={handleChange} className={inputClasses}>
                <optgroup label="Central Asia">
                  <option value="Uzbekistan">Uzbekistan</option><option value="Kazakhstan">Kazakhstan</option><option value="Kyrgyzstan">Kyrgyzstan</option><option value="Tajikistan">Tajikistan</option><option value="Turkmenistan">Turkmenistan</option>
                </optgroup>
                <optgroup label="Southeast Asia">
                  <option value="Vietnam">Vietnam</option><option value="Indonesia">Indonesia</option><option value="Thailand">Thailand</option><option value="Malaysia">Malaysia</option><option value="Philippines">Philippines</option><option value="Singapore">Singapore</option><option value="Cambodia">Cambodia</option><option value="Myanmar">Myanmar</option>
                </optgroup>
                <optgroup label="Other">
                  <option value="India">India</option><option value="China">China</option><option value="International">International</option>
                </optgroup>
              </select>
            </div>

            <div>
              <label htmlFor="studyLevel" className={labelClasses}>Study Level</label>
              <select id="studyLevel" name="studyLevel" value={params.studyLevel} onChange={handleChange} className={inputClasses}>
                <option value="High School">High School</option><option value="Bachelor's Degree">Bachelor's Degree</option><option value="Master's Degree">Master's Degree</option><option value="PhD">PhD / Doctorate</option><option value="Post-Doctorate">Post-Doctorate</option><option value="Vocational Training">Vocational</option>
              </select>
            </div>

            <div>
              <label htmlFor="targetRegion" className={labelClasses}>Destination</label>
              <select id="targetRegion" name="targetRegion" value={params.targetRegion} onChange={handleChange} className={inputClasses}>
                <option value="Anywhere globally">Anywhere globally</option><option value="Europe">Europe</option><option value="USA & Canada">USA & Canada</option><option value="UK">United Kingdom</option><option value="Australia & NZ">Australia & NZ</option><option value="Asia">Asia (Korea, Japan, China)</option>
              </select>
            </div>

            <div>
              <label htmlFor="fieldOfStudy" className={labelClasses}>Field of Study</label>
              <input type="text" id="fieldOfStudy" name="fieldOfStudy" required placeholder="e.g. Computer Science" value={params.fieldOfStudy} onChange={handleChange} className={inputClasses} />
            </div>
          </div>
        </div>

        <div>
          <h3 className={sectionTitle}>Scores (optional, improves matching)</h3>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            <div><label htmlFor="gpa" className={labelClasses}>GPA</label><input type="text" id="gpa" name="gpa" placeholder="e.g. 3.8 / 4.0" value={params.gpa} onChange={handleChange} className={inputClasses} /></div>
            <div><label htmlFor="sat" className={labelClasses}>SAT</label><input type="text" id="sat" name="sat" placeholder="e.g. 1450" value={params.sat} onChange={handleChange} className={inputClasses} /></div>
            <div><label htmlFor="ielts" className={labelClasses}>IELTS</label><input type="text" id="ielts" name="ielts" placeholder="e.g. 7.5" value={params.ielts} onChange={handleChange} className={inputClasses} /></div>
            <div><label htmlFor="toefl" className={labelClasses}>TOEFL</label><input type="text" id="toefl" name="toefl" placeholder="e.g. 100" value={params.toefl} onChange={handleChange} className={inputClasses} /></div>
          </div>
          <p className="mt-3 text-xs text-slate-500">Tip: add scores when available to improve merit-based ranking accuracy.</p>
        </div>

        <div className="flex justify-end">
          <Button type="submit" isLoading={isLoading} className="w-full min-w-[260px] md:w-auto">
            Find Scholarships
          </Button>
        </div>
      </form>
    </section>
  );
};
