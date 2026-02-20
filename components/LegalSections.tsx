import React from 'react';

const cardClass = 'bg-white border border-slate-200 rounded-xl p-6 shadow-sm';

export const LegalSections: React.FC = () => {
  return (
    <section id="legal" className="mt-16 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900">Legal & Policy Center</h2>
        <p className="text-sm text-slate-600 mt-2">Please review these terms before using Scholira services.</p>
      </div>

      <article id="terms-of-service" className={cardClass}>
        <h3 className="text-lg font-semibold text-slate-900 mb-3">Terms and Conditions</h3>
        <ul className="list-disc pl-5 text-sm text-slate-700 space-y-2">
          <li>Scholira provides scholarship discovery information and does not guarantee admissions, visa approvals, or funding outcomes.</li>
          <li>You are responsible for confirming final details on official university and scholarship provider websites.</li>
          <li>You agree to provide accurate profile data for better matching quality and lawful use of the platform.</li>
          <li>Automated scraping, misuse, or unlawful access attempts are strictly prohibited.</li>
        </ul>
      </article>

      <article id="privacy-policy" className={cardClass}>
        <h3 className="text-lg font-semibold text-slate-900 mb-3">Privacy Policy</h3>
        <ul className="list-disc pl-5 text-sm text-slate-700 space-y-2">
          <li>We collect search inputs (country, study level, scores, and preferences) only to provide scholarship recommendations.</li>
          <li>We do not sell personal information. Data is used for platform performance, analytics, and reliability improvements.</li>
          <li>Third-party services may process data as part of scholarship discovery workflows.</li>
          <li>Users can request deletion of stored profile information by contacting support.</li>
        </ul>
      </article>

      <article id="disclaimer-policy" className={cardClass}>
        <h3 className="text-lg font-semibold text-slate-900 mb-3">Disclaimer & Fair Use</h3>
        <ul className="list-disc pl-5 text-sm text-slate-700 space-y-2">
          <li>AI-generated information may contain inaccuracies; always validate dates, amounts, and eligibility with official sources.</li>
          <li>Scholira is not affiliated with all listed scholarship organizations unless explicitly stated.</li>
          <li>Deadlines and funding amounts can change without notice by scholarship providers.</li>
          <li>By using Scholira, you accept these limits and agree to independent verification before applying.</li>
        </ul>
      </article>
    </section>
  );
};
