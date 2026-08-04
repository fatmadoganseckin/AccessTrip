import React, { useState } from 'react';
import { Sparkles, Send, Mic, Volume2, Calendar, AlertTriangle, ArrowRight, UserCheck, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useTrip } from '../../context/TripContext';
import { queryAIAssistant, AIResponse } from '../../services/aiAssistant';

export const AIAssistantDrawer: React.FC = () => {
  const { profile, speakText, startVoiceListening, isVoiceListening } = useAccessibility();
  const { setActiveItinerary, setActiveTab } = useTrip();

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string; data?: AIResponse }[]>([
    {
      role: 'assistant',
      text: `Hello! I am your AI AccessTrip Assistant. I have loaded your accessibility profile (${profile.disabilities.map(d => d.replace('_', ' ')).join(', ')}). Ask me anything, such as "Plan a 5-day wheelchair-friendly trip to Barcelona" or "Find quiet museums with low walking distance".`,
    }
  ]);

  const presetQueries = [
    'Plan a 5-day wheelchair-friendly trip to Barcelona',
    'Find quiet museums with low crowd levels',
    'Which London metro stations have dual elevators working?',
    'Build a low-energy itinerary with step-free transit',
    'Avoid steep hills in San Francisco',
  ];

  const handleSend = async (queryText?: string) => {
    const q = queryText || inputQuery;
    if (!q.trim()) return;

    // Push user message
    setMessages(prev => [...prev, { role: 'user', text: q }]);
    setInputQuery('');
    setLoading(true);

    try {
      const response = await queryAIAssistant(q, profile);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', text: response.message, data: response }
      ]);
      speakText(response.message);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', text: 'I encountered an error retrieving live accessibility data. Please try again.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadItinerary = (response: AIResponse) => {
    if (response.suggestedItinerary) {
      setActiveItinerary(response.suggestedItinerary);
      setActiveTab('planner');
    }
  };

  return (
    <section className="py-10 bg-slate-50 dark:bg-slate-950 min-h-[85vh]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header Banner */}
        <div className="p-6 bg-gradient-to-r from-brand-600 to-indigo-600 text-white rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
              <h1 className="text-2xl font-black">AI Accessible Travel Assistant</h1>
            </div>
            <p className="text-xs text-brand-100 font-medium">
              Generating tailored step-free, low-energy, and slope-aware travel plans.
            </p>
          </div>

          <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 text-xs font-bold flex items-center space-x-2">
            <UserCheck className="w-4 h-4 text-emerald-300" />
            <span>Profile Active: {profile.disabilities.length} Needs Set</span>
          </div>
        </div>

        {/* Chat Area Container */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 h-[650px] flex flex-col overflow-hidden">
          
          {/* Messages Feed */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start space-x-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-teal-500 text-white flex items-center justify-center text-xl flex-shrink-0 shadow-md">
                    ♿
                  </div>
                )}

                <div
                  className={`max-w-2xl p-5 rounded-3xl space-y-4 shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-brand-600 text-white rounded-tr-none font-semibold text-sm'
                      : 'bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 rounded-tl-none border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider opacity-75">
                      {msg.role === 'user' ? 'You' : 'AccessTrip AI Intelligence'}
                    </span>
                    {msg.role === 'assistant' && (
                      <button
                        onClick={() => speakText(msg.text)}
                        className="p-1 text-slate-400 hover:text-brand-500 rounded-lg"
                        title="Read message aloud"
                        aria-label="Read message aloud"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <p className="text-sm leading-relaxed">{msg.text}</p>

                  {/* AI Response Extra Data Blocks */}
                  {msg.data && (
                    <div className="space-y-4 pt-2 border-t border-slate-200/80 dark:border-slate-700/80 text-xs">
                      
                      {/* Metric Badges */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {msg.data.restStopCount && (
                          <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-200 font-bold">
                            🛌 {msg.data.restStopCount} Scheduled Rest Stops
                          </div>
                        )}
                        {msg.data.maxSlopeDetected && (
                          <div className="p-2.5 bg-brand-50 dark:bg-brand-950/60 rounded-xl border border-brand-200 dark:border-brand-900 text-brand-800 dark:text-brand-200 font-bold">
                            📈 Max Slope: {msg.data.maxSlopeDetected}
                          </div>
                        )}
                      </div>

                      {/* Warnings / Alerts */}
                      {msg.data.accessibilityAlerts && msg.data.accessibilityAlerts.length > 0 && (
                        <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900 space-y-1 text-amber-900 dark:text-amber-200">
                          <strong className="font-bold flex items-center space-x-1">
                            <AlertTriangle className="w-4 h-4 text-amber-600" />
                            <span>Accessibility Advisories:</span>
                          </strong>
                          {msg.data.accessibilityAlerts.map((alt, aidx) => (
                            <p key={aidx} className="text-xs">• {alt}</p>
                          ))}
                        </div>
                      )}

                      {/* Recommended Venues */}
                      {msg.data.recommendedVenues && (
                        <div className="space-y-2">
                          <strong className="font-bold text-slate-700 dark:text-slate-300 block">
                            Verified Recommended Locations:
                          </strong>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {msg.data.recommendedVenues.map((ven, vidx) => (
                              <div
                                key={vidx}
                                className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1"
                              >
                                <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                                  <span>{ven.name}</span>
                                  <span className="px-2 py-0.5 bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 rounded font-semibold text-[10px]">
                                    {ven.badge}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-500">{ven.reason}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Load Itinerary CTA Button */}
                      {msg.data.suggestedItinerary && (
                        <button
                          onClick={() => handleLoadItinerary(msg.data!)}
                          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl shadow-md flex items-center justify-center space-x-2 focus:outline-none focus:ring-4 focus:ring-emerald-400 transition-all hover:scale-102"
                        >
                          <Calendar className="w-5 h-5" />
                          <span>Load Custom Itinerary into Drag & Drop Planner</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center space-x-3 text-brand-600 dark:text-brand-400 font-bold text-sm animate-pulse">
                <div className="w-10 h-10 rounded-2xl bg-brand-600 text-white flex items-center justify-center">♿</div>
                <span>Analyzing elevation maps, transit lift status & sensory zones...</span>
              </div>
            )}
          </div>

          {/* Preset Prompts Bar */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center space-x-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex-shrink-0">
              Quick Suggestions:
            </span>
            {presetQueries.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(preset)}
                className="px-3 py-1.5 bg-white dark:bg-slate-900 hover:bg-brand-50 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl border border-slate-200 dark:border-slate-700 flex-shrink-0 transition-all shadow-2xs"
              >
                {preset}
              </button>
            ))}
          </div>

          {/* Query Input Footer */}
          <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center space-x-2"
            >
              <button
                type="button"
                onClick={() => startVoiceListening((txt) => handleSend(txt))}
                className={`p-3 rounded-2xl transition-all ${
                  isVoiceListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
                title="Speak query"
                aria-label="Speak query"
              >
                <Mic className="w-5 h-5" />
              </button>

              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask any accessibility question (e.g. Metro lifts, steep hills, step-free hotels)..."
                className="flex-1 px-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500 font-semibold"
              />

              <button
                type="submit"
                disabled={!inputQuery.trim() || loading}
                className="px-6 py-3.5 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-extrabold rounded-2xl flex items-center space-x-2 focus:outline-none focus:ring-4 focus:ring-brand-400 shadow-md transition-all"
              >
                <Send className="w-5 h-5" />
                <span className="hidden sm:inline">Ask AI</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
