import React from 'react';
import { ThumbsUp, ShieldCheck, Camera, CheckCircle2, Clock } from 'lucide-react';
import { VerifiedCommunityReport } from '../../types/b2c';
import { SafeImage } from '../common/SafeImage';

export const VerifiedCommunityReports: React.FC = () => {
  const reports: VerifiedCommunityReport[] = [
    {
      id: 'rep-01',
      propertyName: 'Gran Vía Accessible Luxury Loft',
      locationName: 'Madrid, Spain',
      verifiedDate: 'August 1, 2026',
      verifiedBy: 'Dr. Marcus Vance (Physical Auditor)',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      photos: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80'
      ],
      findings: {
        rampCondition: 'Smooth 4% slope ramp at main entrance with dual handrails',
        elevatorStatus: 'Dual redundant elevators (95cm door clearance)',
        showerAccess: 'Zero threshold roll-in wet room with fold-down bench',
        doorWidthCm: 98,
        serviceAnimalExperience: 'Welcomed with no extra fees or pet deposit required',
      },
      upvotesCount: 42,
    },
    {
      id: 'rep-02',
      propertyName: 'W Barcelona Accessible Suite',
      locationName: 'Barcelona, Spain',
      verifiedDate: 'July 28, 2026',
      verifiedBy: 'Emma R. (Verified Wheelchair Traveler)',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      photos: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80'
      ],
      findings: {
        rampCondition: 'Direct level boardwalk access to beach',
        elevatorStatus: 'Glass elevator to sky bar & terrace',
        showerAccess: 'Roll-in shower with wall grab bars',
        doorWidthCm: 110,
        serviceAnimalExperience: 'Water bowl and relief area in front plaza',
      },
      upvotesCount: 38,
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase text-emerald-600 tracking-wider block mb-1">
              Waze-Style Community Reports
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              Verified Accessibility Field Reports
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Real photos, exact measurements, and ground-truth findings from auditors & travelers.
            </p>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((rep) => (
            <div
              key={rep.id}
              className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <SafeImage
                    src={rep.avatarUrl}
                    alt={rep.verifiedBy}
                    category="avatar"
                    className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500"
                    containerClassName="w-10 h-10 rounded-full flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">{rep.propertyName}</h3>
                    <span className="text-xs text-slate-500 font-semibold">{rep.locationName}</span>
                  </div>
                </div>

                <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold text-[10px] rounded-full flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Verified Report
                </span>
              </div>

              {/* Photo Thumbnails */}
              <div className="flex items-center space-x-2 overflow-x-auto">
                {rep.photos.map((photo, idx) => (
                  <SafeImage
                    key={idx}
                    src={photo}
                    alt="Field evidence"
                    category="hotel"
                    className="w-24 h-18 object-cover rounded-xl border border-slate-200 dark:border-slate-700"
                    containerClassName="w-24 h-18 flex-shrink-0"
                  />
                ))}
              </div>

              {/* Findings */}
              <div className="space-y-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <div>📐 Entrance Door Clearance: <strong className="text-slate-900 dark:text-slate-100">{rep.findings.doorWidthCm}cm</strong></div>
                <div>🛗 Elevator: {rep.findings.elevatorStatus}</div>
                <div>🚿 Shower: {rep.findings.showerAccess}</div>
                <div>🐕‍🦺 Service Animal: {rep.findings.serviceAnimalExperience}</div>
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500">
                <span>Verified on {rep.verifiedDate}</span>
                <button className="flex items-center space-x-1 px-3 py-1 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 font-bold hover:bg-emerald-50">
                  <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Helpful ({rep.upvotesCount})</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
