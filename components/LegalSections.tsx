import React from 'react';

const cardClass = 'bg-white border border-indigo-100 rounded-2xl p-6 shadow-sm';

export const LegalSections: React.FC = () => {
  return (
    <section id="legal" className="mt-16 space-y-6">
      <div id="features" className="text-center">
        <h2 className="text-2xl font-bold text-slate-900">Legal & Policy Center</h2>
        <p className="text-sm text-slate-600 mt-2">Please review these terms before using Scholira services.</p>
      </div>
      <article id="terms-of-service" className={cardClass}><h3 className="text-lg font-semibold text-slate-900 mb-3">Terms and Conditions</h3><ul className="list-disc pl-5 text-sm text-slate-700 space-y-2"><li>Scholira provides discovery information and does not guarantee admissions, funding, or certification outcomes.</li><li>You should validate final details on official provider websites.</li><li>Use the platform lawfully and provide accurate profile data.</li></ul></article>
      <article id="privacy-policy" className={cardClass}><h3 className="text-lg font-semibold text-slate-900 mb-3">Privacy Policy</h3><ul className="list-disc pl-5 text-sm text-slate-700 space-y-2"><li>We collect search inputs only to return relevant opportunities.</li><li>We do not sell personal information.</li><li>Third-party services may process requests for matching workflows.</li></ul></article>
      <article id="disclaimer-policy" className={cardClass}><h3 className="text-lg font-semibold text-slate-900 mb-3">Disclaimer & Fair Use</h3><ul className="list-disc pl-5 text-sm text-slate-700 space-y-2"><li>AI-generated information may contain inaccuracies.</li><li>Deadlines and eligibility can change without notice.</li><li>Always verify details directly with the official source.</li></ul></article>
    </section>
  );
};
