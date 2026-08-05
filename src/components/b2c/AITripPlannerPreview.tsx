import React, { useState } from 'react';
import { Sparkles, Send, MapPin, Compass, ArrowRight, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import { useTrip } from '../../context/TripContext';

export const AITripPlannerPreview: React.FC = () => {
  const { setActiveTab } = useTrip();
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);

  const samplePrompts = [
    'Plan a 5-day accessible trip to Barcelona',
    'Find hotels near accessible metro stations',
    'Suggest museums with elevators',
    'Avoid steep streets & hilly routes',
    'Create low-energy itinerary with rest stops',
  ];

  const handleGenerate = (promptText: string) => {
    setAiPrompt(promptText);
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedPlan(
        `AI Recommended 5-Day Accessible Barcelona Itinerary:
- Day 1: Flat arrival at El Prat airport, step-free Aerobús transfer to Eixample, stay at Gran Vía Loft (Step-free entrance & roll-in shower verified).
- Day 2: Accessible Gothic Quarter boardwalk trail (Max 3% gradient), elevator access at Picasso Museum.
- Day 3: Low-energy morning at Sagrada Família (Ramp entrance & tactile models), afternoon rest stop at Ciutadella Park.
- Day 4: Beachfront wheelchair boardwalk at Barceloneta beach with sea-hoist assistance.
- Day 5: Tapas tasting at La Boqueria (Wide aisles & accessible restrooms).`
      );
    }, 1200);
  };

  return (
    <section className="py-16 bg-slate-900 text-white border-b border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 font-extrabold text-xs rounded-full border border-emerald-500/40">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AccessTrip AI Travel Assistant</span>
          </span>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Ask AI to plan your perfect accessible trip
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 font-medium">
            Combines live hotels, maps, transit accessibility, weather, rest stops, and continuous walking limits.
          </p>
        </div>

        {/* AI Input Box */}
        <div className="max-w-3xl mx-auto bg-slate-800/80 rounded-3xl p-4 border border-slate-700 space-y-4 shadow-2xl">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="e.g. Plan a 5-day step-free trip to Barcelona for a power wheelchair user..."
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              className="w-full bg-transparent text-sm font-bold text-white placeholder-slate-500 focus:outline-none"
            />
            <button
              onClick={() => handleGenerate(aiPrompt || samplePrompts[0])}
              disabled={isGenerating}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-2xl shadow-lg flex items-center space-x-1.5 transition-all flex-shrink-0"
            >
              {isGenerating ? <span>Generating...</span> : <><span>Generate Plan</span> <Send className="w-3.5 h-3.5" /></>}
            </button>
          </div>

          {/* Quick Prompt Chips */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-700">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleGenerate(p)}
                className="px-3 py-1 bg-slate-700/60 hover:bg-emerald-950 text-slate-300 font-semibold text-xs rounded-full border border-slate-600/50 transition-all text-left"
              >
                "{p}"
              </button>
            ))}
          </div>
        </div>

        {/* AI Generated Output Card */}
        {generatedPlan && (
          <div className="max-w-3xl mx-auto p-6 bg-slate-800 rounded-3xl border border-emerald-500/40 space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-emerald-400 flex items-center space-x-1">
                <ShieldCheck className="w-4 h-4 mr-1" /> AI Custom Accessibility Itinerary
              </span>
              <button
                onClick={() => setActiveTab('assistant')}
                className="text-xs font-bold text-emerald-400 hover:underline flex items-center"
              >
                <span>Open Full AI Assistant Workspace</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>

            <pre className="text-xs text-slate-200 font-sans whitespace-pre-wrap leading-relaxed font-medium">
              {generatedPlan}
            </pre>
          </div>
        )}

      </div>
    </section>
  );
};
