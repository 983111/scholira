import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="bg-slate-900 relative overflow-hidden pb-40 pt-10">
       {/* Abstract Professional Background */}
       <div className="absolute inset-0 opacity-20">
         <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
               <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
               </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
         </svg>
      </div>
      
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-indigo-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[600px] h-[600px] bg-slate-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10 text-center">
        <div className="inline-flex items-center rounded-full px-3 py-1 text-sm leading-6 text-indigo-200 ring-1 ring-white/10 hover:ring-white/20 mb-8 bg-white/5 backdrop-blur-sm">
          <span className="font-semibold text-white">New</span>
          <span className="h-4 w-px bg-white/20 mx-2"></span>
          <span>Expanded support for Southeast Asian Students</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
          Global Academic Funding <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-blue-400">Simplified by Intelligence</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-slate-300 font-light leading-relaxed">
          Scholara connects ambitious students from Uzbekistan, Vietnam, Indonesia, and beyond 
          with verified global scholarships using advanced AI discovery.
        </p>
      </div>
    </div>
  );
};
