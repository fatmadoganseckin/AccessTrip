import React from 'react';
import { LayoutDashboard, ShieldCheck, Activity, Award, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, LineChart, Line } from 'recharts';
import { useTrip } from '../../context/TripContext';

export const AccessibilityMetricsDashboard: React.FC = () => {
  const { destinations } = useTrip();

  const chartData = destinations.map(d => ({
    name: d.name,
    Overall: d.scores.overall,
    Transit: d.scores.transportation,
    Sidewalks: d.scores.sidewalkQuality,
    Elevators: d.scores.elevatorAvailability,
    Restrooms: d.scores.restroomAvailability,
    Medical: d.scores.medicalSupport,
  }));

  const verificationTimeline = [
    { month: 'Jan', Verified: 82, Pending: 18 },
    { month: 'Feb', Verified: 85, Pending: 15 },
    { month: 'Mar', Verified: 88, Pending: 12 },
    { month: 'Apr', Verified: 91, Pending: 9 },
    { month: 'May', Verified: 94, Pending: 6 },
    { month: 'Jun', Verified: 96, Pending: 4 },
  ];

  return (
    <section className="py-10 bg-slate-50 dark:bg-slate-950 min-h-[85vh] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-8 bg-gradient-to-r from-brand-700 via-brand-600 to-indigo-700 text-white rounded-3xl shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center space-x-3">
              <LayoutDashboard className="w-8 h-8 text-amber-300" />
              <h1 className="text-3xl font-black">Accessibility Metrics Dashboard</h1>
            </div>
            <p className="text-sm text-brand-100 font-medium">
              Enterprise-level analytics tracking global entrance accessibility, transit lift uptime, and verification accuracy.
            </p>
          </div>

          <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 text-xs font-bold flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>98.4% Verification Accuracy Index</span>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
              <span>Entrance Access</span>
              <span className="text-emerald-500 font-extrabold">+4.2%</span>
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-slate-100">94.8%</p>
            <p className="text-[11px] text-slate-500 font-medium">Step-free or ramped entrances</p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
              <span>Elevator Uptime</span>
              <span className="text-emerald-500 font-extrabold">95.2%</span>
            </div>
            <p className="text-3xl font-black text-brand-600 dark:text-brand-400">95.2%</p>
            <p className="text-[11px] text-slate-500 font-medium">Verified operational lifts</p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
              <span>Restroom Usability</span>
              <span className="text-indigo-500 font-extrabold">89.4%</span>
            </div>
            <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">89.4%</p>
            <p className="text-[11px] text-slate-500 font-medium">ADA grab-bar equipped toilets</p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
              <span>Information Confidence</span>
              <span className="text-amber-500 font-extrabold">High</span>
            </div>
            <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">98.4%</p>
            <p className="text-[11px] text-slate-500 font-medium">Ground inspector audited</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Chart 1: City Score Comparison */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                  Global Hub Accessibility Breakdown
                </h3>
                <p className="text-xs text-slate-500">Comparison of transit, sidewalk smoothness, and elevator availability</p>
              </div>
              <span className="text-xs font-bold text-brand-600 dark:text-brand-400">Real-Time Data</span>
            </div>

            <div className="h-80 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" stroke="#888888" fontSize={11} tickLine={false} />
                  <YAxis stroke="#888888" fontSize={11} domain={[0, 100]} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '12px',
                      color: '#f8fafc',
                      fontSize: '12px',
                      fontWeight: 'bold',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="Transit" fill="#0c8de4" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Sidewalks" fill="#059669" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Elevators" fill="#d97706" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Verification Accuracy Rate */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                  Community Verification Progress
                </h3>
                <p className="text-xs text-slate-[500]">Ratio of ground-inspected vs pending community reports</p>
              </div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">96% Verified</span>
            </div>

            <div className="h-80 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={verificationTimeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="month" stroke="#888888" fontSize={11} tickLine={false} />
                  <YAxis stroke="#888888" fontSize={11} domain={[0, 100]} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '12px',
                      color: '#f8fafc',
                      fontSize: '12px',
                      fontWeight: 'bold',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Line type="monotone" dataKey="Verified" stroke="#059669" strokeWidth={3} dot={{ r: 5 }} />
                  <Line type="monotone" dataKey="Pending" stroke="#e11d48" strokeWidth={2} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
