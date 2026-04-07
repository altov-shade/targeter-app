
import React, { useState, useCallback } from 'react';
import { TargetingRequest, TargetingResult, Sponsor } from './types';
import { generateSponsorshipStrategy } from './services/geminiService';
import InputSection from './components/InputSection';
import SponsorCard from './components/SponsorCard';

const App: React.FC = () => {
  const [request, setRequest] = useState<TargetingRequest>({
    property: '',
    geography: '',
    audienceProfile: '',
    sponsorshipGoal: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TargetingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);
const [showBrief, setShowBrief] = useState(false);

  const handleInputChange = (field: keyof TargetingRequest, value: string) => {
    setRequest(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateSponsorshipStrategy(request);
      setResult(data);
    } catch (err) {
      console.error("Analysis Error:", err);
      setError("An error occurred while generating the sponsorship strategy. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const tier1Sponsors = result?.sponsors.filter(s => s.tier.toString().includes('1')) || [];
  const tier2Sponsors = result?.sponsors.filter(s => s.tier.toString().includes('2')) || [];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-200">
              <i className="fa-solid fa-tower-observation text-white text-xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-800">Pavilion Targeter</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Sponsorship Intelligence</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-500">
            <span className="flex items-center gap-1.5 cursor-pointer hover:text-blue-600 transition-colors">
              <i className="fa-solid fa-book-open"></i> Documentation
            </span>
            <span className="flex items-center gap-1.5 cursor-pointer hover:text-blue-600 transition-colors">
              <i className="fa-solid fa-gear"></i> Settings
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar - Inputs */}
          <aside className="lg:col-span-4">
            <InputSection 
              request={request}
              onChange={handleInputChange}
              onSubmit={handleGenerate}
              isLoading={loading}
            />
          </aside>

          {/* Main Content - Results */}
          <div className="lg:col-span-8 space-y-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl flex items-center gap-3">
                <i className="fa-solid fa-triangle-exclamation text-xl"></i>
                <p className="font-medium">{error}</p>
              </div>
            )}

            {!result && !loading && !error && (
              <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-16 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                   <i className="fa-solid fa-magnifying-glass-chart text-4xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Ready to Target</h2>
                <p className="text-slate-500 max-w-md mx-auto">
                  Enter your property details on the left to generate a tailored sponsorship acquisition strategy.
                </p>
              </div>
            )}

            {loading && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-8 border border-slate-200 animate-pulse">
                  <div className="h-6 bg-slate-100 rounded w-1/4 mb-4"></div>
                  <div className="h-4 bg-slate-50 rounded w-full mb-2"></div>
                  <div className="h-4 bg-slate-50 rounded w-5/6"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="bg-white rounded-xl h-48 border border-slate-200 animate-pulse p-6">
                      <div className="h-4 bg-slate-100 rounded w-3/4 mb-4"></div>
                      <div className="h-10 bg-slate-50 rounded w-full mb-4"></div>
                      <div className="flex gap-2">
                        <div className="h-4 bg-slate-50 rounded w-1/3"></div>
                        <div className="h-4 bg-slate-50 rounded w-1/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result && !loading && (
              <div className="space-y-10">
                {/* Strategy Header */}
                <div className="bg-slate-900 rounded-2xl p-8 text-white shadow-xl">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-3xl font-bold mb-1">Targeting Strategy</h2>
                      <p className="text-slate-400 font-medium">Prepared for: {request.property}</p>
                    </div>
                    <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 self-start md:self-auto">
                      <i className="fa-solid fa-file-export"></i>
                      Export Report
                    </button>
                  </div>
                  <div className="border-t border-white/10 pt-6">
                    <h3 className="text-[18px] font-bold text-[#7cc0ff] mb-[10px] leading-snug">
                      &ldquo;{result.strategyHeadline}&rdquo;
                    </h3>
                    <p className="text-slate-300 leading-relaxed max-w-3xl">
                      {result.executiveSummary}
                    </p>
                  </div>
                </div>

                {/* Tier 1 Sponsors */}
                <section>
                  <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-2">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <span className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center text-white text-[10px]">1</span>
                      Primary Tier Targets (Strategic Fit)
                    </h3>
                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">
                      {tier1Sponsors.length} Sponsors
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {tier1Sponsors.map((sponsor, idx) => (
                      <SponsorCard key={idx} sponsor={sponsor} />
                    ))}
                  </div>
                </section>

                {/* Tier 2 Sponsors */}
                <section>
                  <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-2">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <span className="w-6 h-6 bg-slate-400 rounded-md flex items-center justify-center text-white text-[10px]">2</span>
                      Secondary Tier Targets (Opportunistic)
                    </h3>
                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">
                      {tier2Sponsors.length} Sponsors
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tier2Sponsors.map((sponsor, idx) => (
  <div key={idx}>
    <SponsorCard sponsor={sponsor} />

    <button
      onClick={() => {
        setSelectedSponsor(sponsor);
        setShowBrief(true);
      }}
      className="mt-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg"
    >
      Create Brief
    </button>
  </div>
))}
                
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-sm text-blue-800">
                  <h4 className="font-bold flex items-center gap-2 mb-2">
                    <i className="fa-solid fa-circle-info"></i>
                    Methodology Note
                  </h4>
                  <p>
                    These targets are illustrative examples based on common industry patterns. Evaluation is performed against audience alignment, geographic presence, and activation potential. Always perform direct due diligence before initiating outreach.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* ===== BRIEF SECTION ===== */}
{showBrief && selectedSponsor && (
  <div className="mt-10 bg-white border rounded-xl p-6 shadow-lg">
    <h2 className="text-xl font-bold mb-4">Brief Builder</h2>

    <p><strong>Company:</strong> {selectedSponsor.name}</p>
    <p><strong>Category:</strong> {selectedSponsor.category}</p>

    <div className="mt-4">
      <button className="px-4 py-2 bg-slate-900 text-white rounded-lg">
        Generate AI Brief
      </button>

      <button
        onClick={() => setShowBrief(false)}
        className="ml-3 px-4 py-2 bg-gray-200 rounded-lg"
      >
        Close
      </button>
    </div>
  </div>
)}

</main>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200 bg-white py-10">
  <div className="max-w-7xl mx-auto px-4 text-center">
    <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-2">
      Created by Alto Gary
    </p>
    <p className="text-slate-400 text-[10px]">
      &copy; {new Date().getFullYear()} Demo Environment. All brands are fictional examples.
    </p>
    <p className="text-slate-400 text-[10px] mt-1">
      Targets shown are illustrative examples generated for demonstration purposes only.
    </p>
  </div>
</footer>

    </div>
  );
};

export default App;
