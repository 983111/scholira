import React from 'react';

const cardClass = 'rounded-2xl border border-slate-200 bg-white p-6 shadow-sm';

export const LegalSections: React.FC = () => {
  return (
    <section id="legal" className="mt-20 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900">Legal & Policy Center</h2>
        <p className="mt-2 text-sm text-slate-600">All core legal information is available here for transparent and safe platform use.</p>
      </div>

      <article id="terms-of-service" className={cardClass}>
        <h3 className="mb-3 text-lg font-semibold text-slate-900">Terms and Conditions</h3>
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>Scholira provides scholarship discovery information only and does not guarantee acceptance, visa approvals, or funding outcomes.</li>
          <li>You are responsible for verifying deadlines, amounts, and requirements directly on official provider websites before applying.</li>
          <li>Users must submit accurate profile information and use the service lawfully.</li>
          <li>Unauthorized automation, scraping abuse, and security attacks are strictly prohibited.</li>
        </ul>
      </article>

      <article id="privacy-policy" className={cardClass}>
        <h3 className="mb-3 text-lg font-semibold text-slate-900">Privacy Policy</h3>
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>We collect search inputs (such as country, study level, destination, and optional scores) to deliver personalized scholarship recommendations.</li>
          <li>We do not sell personal data; information may be used to improve performance, analytics, and reliability.</li>
          <li>Third-party providers used for recommendation workflows may process limited request data.</li>
          <li>You can request data deletion through support channels provided by Scholira.</li>
        </ul>
      </article>

      <article id="disclaimer-policy" className={cardClass}>
        <h3 className="mb-3 text-lg font-semibold text-slate-900">Disclaimer & Fair Use</h3>
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>AI-assisted output may contain inaccuracies; verify all final scholarship details from official sources.</li>
          <li>Scholira is not automatically affiliated with listed scholarship programs unless explicitly stated.</li>
          <li>Scholarship rules, deadlines, and amounts may change without notice by providers.</li>
          <li>By using Scholira, you agree to independently verify key details before making application decisions.</li>
        </ul>
      </article>
    </section>
  );
};
