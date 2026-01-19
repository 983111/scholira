import React from 'react';
import { AlertCircle, FileQuestion, Clock, Check, Database, BrainCircuit, BellRing } from 'lucide-react';

const ProblemSolution: React.FC = () => {
  return (
    <>
      {/* Problem Section */}
      <section id="problem" className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base text-brand-600 font-semibold tracking-wide uppercase">The Problem</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Why Students Miss Opportunities
            </p>
            <p className="mt-4 max-w-2xl text-xl text-slate-500 mx-auto">
              Navigating the scholarship landscape in Central Asia is currently broken.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <FileQuestion className="h-10 w-10 text-red-500" />,
                title: "Scattered Information",
                desc: "Information is spread across hundreds of disconnected websites, making search exhausting."
              },
              {
                icon: <AlertCircle className="h-10 w-10 text-amber-500" />,
                title: "Fake Opportunities",
                desc: "Students waste time applying to scams or expired listings that promise funding but deliver nothing."
              },
              {
                icon: <Clock className="h-10 w-10 text-orange-500" />,
                title: "Missed Deadlines",
                desc: "Without a centralized tracking system, critical application windows are missed annually."
              }
            ].map((item, index) => (
              <div key={index} className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-shadow">
                <div className="bg-white rounded-xl w-16 h-16 flex items-center justify-center shadow-sm mb-6 border border-slate-100">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-brand-400 font-semibold tracking-wide uppercase mb-2">The Solution</h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                A Smart Platform Built for Success
              </h3>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                We've built the infrastructure to connect talent in Uzbekistan with the global funding they deserve.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    icon: <Database className="h-6 w-6 text-brand-400" />,
                    title: "Centralized Verified Platform",
                    desc: "Every listing is vetted for authenticity. No more scams."
                  },
                  {
                    icon: <BrainCircuit className="h-6 w-6 text-brand-400" />,
                    title: "AI Recommendations",
                    desc: "Our algorithms match you with grants based on your unique profile."
                  },
                  {
                    icon: <BellRing className="h-6 w-6 text-brand-400" />,
                    title: "Deadline Reminders",
                    desc: "Automated notifications ensure you never miss a submission date."
                  }
                ].map((feature, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700">
                        {feature.icon}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">{feature.title}</h4>
                      <p className="text-slate-400">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-brand-600 to-indigo-700 rounded-2xl p-1 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="bg-slate-900 rounded-xl p-6 h-full border border-slate-700">
                   {/* Mock UI Dashboard */}
                   <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-700"></div>
                        <div>
                          <div className="h-3 w-24 bg-slate-700 rounded mb-1"></div>
                          <div className="h-2 w-16 bg-slate-800 rounded"></div>
                        </div>
                      </div>
                      <div className="h-8 w-20 bg-brand-600 rounded-lg opacity-20"></div>
                   </div>
                   <div className="space-y-4">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="bg-slate-800 rounded-lg p-4 border border-slate-700 flex justify-between items-center">
                          <div>
                            <div className="h-3 w-32 bg-slate-600 rounded mb-2"></div>
                            <div className="h-2 w-20 bg-slate-700 rounded"></div>
                          </div>
                          <div className="h-6 w-6 rounded-full border-2 border-brand-500 flex items-center justify-center">
                            <Check className="h-3 w-3 text-brand-500" />
                          </div>
                        </div>
                      ))}
                   </div>
                   <div className="mt-6 pt-4 border-t border-slate-800">
                      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-500 w-3/4"></div>
                      </div>
                      <div className="mt-2 flex justify-between text-xs text-slate-500">
                         <span>Profile Completeness</span>
                         <span>75%</span>
                      </div>
                   </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white text-slate-900 px-6 py-3 rounded-lg shadow-xl border border-slate-200">
                <p className="font-bold text-lg">95%</p>
                <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Match Accuracy</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProblemSolution;