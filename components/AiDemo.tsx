import React, { useState } from 'react';
import { Sparkles, Loader2, BookOpen, MapPin, Search } from 'lucide-react';
import { getScholarshipRecommendations } from '../services/geminiService';

const AiDemo: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);
  const [formData, setFormData] = useState({
    level: 'Undergraduate',
    field: 'Computer Science',
    location: 'Tashkent, Uzbekistan'
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResults(null);
    try {
      const data = await getScholarshipRecommendations(formData);
      setResults(data);
    } catch (error) {
      console.error("Failed to fetch", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="demo" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 text-brand-400 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="h-3 w-3" />
            Live Demo
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-4">Experience the AI Engine</h2>
          <p className="text-slate-400 text-lg">Input your profile details below to see how our AI matches you with real opportunities.</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-8">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-medium ml-1">Education Level</label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <select 
                  className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none appearance-none"
                  value={formData.level}
                  onChange={(e) => setFormData({...formData, level: e.target.value})}
                >
                  <option>Undergraduate</option>
                  <option>Master's</option>
                  <option>PhD</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-medium ml-1">Field of Study</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input 
                  type="text"
                  className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none placeholder-slate-500"
                  placeholder="e.g. Economics"
                  value={formData.field}
                  onChange={(e) => setFormData({...formData, field: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-medium ml-1">Current Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input 
                  type="text"
                  className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none placeholder-slate-500"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>
            </div>

            <div className="flex items-end">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Find Matches'}
              </button>
            </div>
          </form>

          {/* Results Area */}
          <div className="min-h-[200px]">
            {!results && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 py-10">
                <Sparkles className="h-12 w-12 mb-4 opacity-20" />
                <p>AI results will appear here</p>
              </div>
            )}

            {loading && (
              <div className="space-y-4 animate-pulse">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white/5 rounded-lg p-4 border border-white/5">
                    <div className="h-4 bg-slate-700 rounded w-1/3 mb-2"></div>
                    <div className="h-3 bg-slate-700 rounded w-1/4 mb-4"></div>
                    <div className="h-12 bg-slate-800/50 rounded w-full"></div>
                  </div>
                ))}
              </div>
            )}

            {results && results.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-white font-semibold mb-4">Recommended for You:</h3>
                {results.map((item, idx) => (
                  <div key={idx} className="bg-slate-800/50 rounded-lg p-5 border border-slate-700 hover:border-brand-500/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-bold text-white">{item.name}</h4>
                      <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded">{item.amount}</span>
                    </div>
                    <div className="text-sm text-slate-400 mb-3 flex gap-4">
                      <span>Deadline: <span className="text-white">{item.deadline}</span></span>
                    </div>
                    <div className="bg-brand-900/20 border border-brand-500/20 p-3 rounded text-sm text-brand-200">
                      <span className="font-semibold mr-1">AI Insight:</span>
                      {item.matchReason}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiDemo;