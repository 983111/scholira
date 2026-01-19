import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import MarketChart from './components/MarketChart';
import Features from './components/Features';
import BusinessModel from './components/BusinessModel';
import AiDemo from './components/AiDemo';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      <main>
        <Hero />
        <ProblemSolution />
        <Features />
        <AiDemo />
        <MarketChart />
        <BusinessModel />
        
        {/* Team/Vision Section based on Pitch Deck */}
        <section className="py-20 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <h2 className="text-base text-brand-600 font-semibold tracking-wide uppercase mb-2">Our Vision</h2>
             <p className="text-3xl font-extrabold text-slate-900 sm:text-4xl mb-6">Building Education Infrastructure</p>
             <p className="max-w-3xl mx-auto text-xl text-slate-500 leading-relaxed mb-12">
               We aren't just a website. We are scaling to become the fundamental layer for educational mobility across all of Central Asia.
             </p>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6">
                   <h4 className="text-lg font-bold text-slate-900">Founder-Market Fit</h4>
                   <p className="mt-2 text-slate-500">Deep understanding of the local educational nuances and struggles.</p>
                </div>
                <div className="p-6">
                   <h4 className="text-lg font-bold text-slate-900">Strong Tech Execution</h4>
                   <p className="mt-2 text-slate-500">Robust platform built for scale, speed, and mobile-first users.</p>
                </div>
                <div className="p-6">
                   <h4 className="text-lg font-bold text-slate-900">Clear Vision</h4>
                   <p className="mt-2 text-slate-500">From Uzbekistan to the entirety of Central Asia.</p>
                </div>
             </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;