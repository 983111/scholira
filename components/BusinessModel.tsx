import React from 'react';
import { Crown, Building2, Megaphone } from 'lucide-react';

const BusinessModel: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900">Business Model</h2>
          <p className="mt-4 text-xl text-slate-500">Sustainable growth through multiple revenue streams.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: "Premium Users",
              icon: <Crown className="h-8 w-8 text-yellow-500" />,
              features: ["Advanced AI Writing Assistant", "Priority Support", "Unlimited Saved Lists"]
            },
            {
              title: "University Listings",
              icon: <Building2 className="h-8 w-8 text-blue-500" />,
              features: ["Promoted Programs", "Direct Student Recruiting", "Analytics Dashboard"]
            },
            {
              title: "Sponsored Ops",
              icon: <Megaphone className="h-8 w-8 text-purple-500" />,
              features: ["Brand Awareness", "Targeted Reach", "Event Promotion"]
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
              <ul className="text-left space-y-3">
                {item.features.map((feature, fIdx) => (
                  <li key={fIdx} className="text-slate-600 text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Competition */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="p-8 md:p-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Competition: Moving Beyond Telegram</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="p-4 border-b-2 border-slate-100 text-slate-500 font-medium w-1/3">Feature</th>
                    <th className="p-4 border-b-2 border-slate-100 text-slate-500 font-medium w-1/3">Telegram Channels</th>
                    <th className="p-4 border-b-2 border-brand-100 text-brand-600 font-bold w-1/3 bg-brand-50 rounded-t-lg">GrantFocus</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Searchability", telegram: "Poor (Scroll based)", us: "Instant Smart Filters" },
                    { feature: "Verification", telegram: "Unreliable", us: "100% Verified" },
                    { feature: "Personalization", telegram: "None (Broadcast)", us: "AI-Powered Matching" },
                    { feature: "Application Tracking", telegram: "None", us: "Built-in Dashboard" }
                  ].map((row, rIdx) => (
                    <tr key={rIdx} className="border-b border-slate-50 last:border-0">
                      <td className="p-4 font-medium text-slate-900">{row.feature}</td>
                      <td className="p-4 text-slate-500">{row.telegram}</td>
                      <td className="p-4 bg-brand-50/30 text-brand-700 font-semibold">{row.us}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessModel;