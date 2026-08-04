import React, { useState } from 'react';
import { X, MessageSquareQuote, Check, Star, ShieldCheck, Camera } from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { DisabilityType } from '../../types/accessibility';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ReviewSubmissionModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { destinations, addReview } = useTrip();
  const { profile } = useAccessibility();

  const [destinationId, setDestinationId] = useState(destinations[0]?.id || 'barcelona-spain');
  const [ramps, setRamps] = useState<'Yes' | 'Partial' | 'No' | 'Not Needed'>('Yes');
  const [elevators, setElevators] = useState<'Yes' | 'Some Outages' | 'No Elevators' | 'N/A'>('Yes');
  const [toilets, setToilets] = useState<'Yes - Great' | 'Tight Space' | 'Out of Order' | 'None'>('Yes - Great');
  const [staffRating, setStaffRating] = useState(5);
  const [matchedOnline, setMatchedOnline] = useState(true);
  const [comments, setComments] = useState('');
  const [authorDisability, setAuthorDisability] = useState<DisabilityType>(profile.disabilities[0] || 'manual_wheelchair');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dest = destinations.find(d => d.id === destinationId);

    addReview({
      destinationId,
      destinationName: dest?.name || 'Barcelona',
      authorName: 'You (Verified Traveler)',
      authorDisability,
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rampsAvailable: ramps,
      elevatorsWorking: elevators,
      accessibleToiletsUsable: toilets,
      staffHelpfulnessRating: staffRating,
      matchedOnlineDescription: matchedOnline,
      comments: comments || 'Great accessibility experience on site!',
      verifiedVisit: true,
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-modal-title"
    >
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-3 text-brand-600 dark:text-brand-400">
            <MessageSquareQuote className="w-8 h-8" />
            <div>
              <h2 id="review-modal-title" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Submit Structured Accessibility Review
              </h2>
              <p className="text-xs font-semibold text-slate-500">
                Provide ground-truth non-binary accessibility measurements for fellow travelers.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-xl"
            aria-label="Close review form"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Destination Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Select Destination / Location
            </label>
            <select
              value={destinationId}
              onChange={(e) => setDestinationId(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {destinations.map(d => (
                <option key={d.id} value={d.id}>{d.name}, {d.country}</option>
              ))}
            </select>
          </div>

          {/* Question 1: Ramps */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              1. Were ramps available and adequately sloped?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {(['Yes', 'Partial', 'No', 'Not Needed'] as const).map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setRamps(opt)}
                  className={`py-2.5 px-3 rounded-xl border font-bold transition-all ${
                    ramps === opt
                      ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Elevators */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              2. Were elevators operational on site?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {(['Yes', 'Some Outages', 'No Elevators', 'N/A'] as const).map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setElevators(opt)}
                  className={`py-2.5 px-3 rounded-xl border font-bold transition-all ${
                    elevators === opt
                      ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3: Toilets */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              3. Were accessible toilets usable with grab bars?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {(['Yes - Great', 'Tight Space', 'Out of Order', 'None'] as const).map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setToilets(opt)}
                  className={`py-2.5 px-3 rounded-xl border font-bold transition-all ${
                    toilets === opt
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Staff Helpfulness & Online Match */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Staff Helpfulness Rating (1 to 5)
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setStaffRating(star)}
                    className="p-1 focus:outline-none"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= staffRating ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-700'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Did reality match online description?
              </label>
              <div className="flex items-center space-x-2 pt-1">
                <button
                  type="button"
                  onClick={() => setMatchedOnline(true)}
                  className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs border ${
                    matchedOnline
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Yes, Matched
                </button>
                <button
                  type="button"
                  onClick={() => setMatchedOnline(false)}
                  className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs border ${
                    !matchedOnline
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  No, Misleading
                </button>
              </div>
            </div>
          </div>

          {/* Comments Area */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Detailed Experience & Tips
            </label>
            <textarea
              rows={3}
              placeholder="Describe door widths, entrance steps, elevator locations, staff helpfulness..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Submit CTA */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-8 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-brand-400 transition-all hover:scale-105"
            >
              Post Verified Review
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
