import React from 'react';
import { X, Check, Sliders, Shield, Heart, Sparkles, AlertCircle } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { DisabilityType, PreferenceKey } from '../../types/accessibility';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const DISABILITY_OPTIONS: { id: DisabilityType; label: string; icon: string; category: string }[] = [
  { id: 'manual_wheelchair', label: 'Manual Wheelchair', icon: '👨‍🦽', category: 'Mobility' },
  { id: 'power_wheelchair', label: 'Power Wheelchair', icon: '👩‍🦼', category: 'Mobility' },
  { id: 'cane', label: 'Cane User', icon: '🦯', category: 'Mobility' },
  { id: 'walker', label: 'Walker / Rollator', icon: '🚶‍♂️', category: 'Mobility' },
  { id: 'blind', label: 'Blind', icon: '🕶️', category: 'Visual' },
  { id: 'low_vision', label: 'Low Vision', icon: '👁️', category: 'Visual' },
  { id: 'hearing_impairment', label: 'Hard of Hearing', icon: '🦻', category: 'Auditory' },
  { id: 'deaf', label: 'Deaf', icon: '🧏‍♀️', category: 'Auditory' },
  { id: 'autism', label: 'Autism Spectrum', icon: '🧩', category: 'Neurodiversity' },
  { id: 'adhd', label: 'ADHD', icon: '⚡', category: 'Neurodiversity' },
  { id: 'sensory_sensitivity', label: 'Sensory Sensitivity', icon: '🎧', category: 'Neurodiversity' },
  { id: 'elderly_traveler', label: 'Elderly Traveler', icon: '👵', category: 'Age & Physical' },
  { id: 'temporary_injury', label: 'Temporary Injury', icon: '🩹', category: 'Age & Physical' },
];

const PREFERENCE_OPTIONS: { id: PreferenceKey; label: string; icon: string }[] = [
  { id: 'elevator_required', label: 'Elevator Required', icon: '🛗' },
  { id: 'step_free_access', label: 'Step-Free Access', icon: '♿' },
  { id: 'accessible_bathroom', label: 'Accessible Bathroom', icon: '🚽' },
  { id: 'quiet_environments', label: 'Quiet Environments', icon: '🤫' },
  { id: 'low_walking_distance', label: 'Low Walking Distance', icon: '🛋️' },
  { id: 'accessible_transportation', label: 'Accessible Public Transport', icon: '🚌' },
  { id: 'braille', label: 'Braille Signage', icon: '⠃' },
  { id: 'audio_assistance', label: 'Audio Assistance Guides', icon: '🔊' },
  { id: 'service_animal_support', label: 'Service Animal Friendly', icon: '🐕‍🦺' },
  { id: 'accessible_parking', label: 'Accessible Parking Spots', icon: '🅿️' },
  { id: 'rest_areas', label: 'Frequent Rest Benches', icon: '🪑' },
  { id: 'medical_facilities_nearby', label: 'Medical ER Proximity', icon: '🏥' },
];

export const ProfileOnboardingModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { profile, toggleDisability, togglePreference, updateProfile, speakText } = useAccessibility();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-modal-title"
    >
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-3 text-brand-600 dark:text-brand-400">
            <Sliders className="w-8 h-8" />
            <div>
              <h2 id="profile-modal-title" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Personal Accessibility Profile
              </h2>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Tailor all destination scores, itineraries, and AI recommendations to your exact needs.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 focus:outline-none focus:ring-4 focus:ring-brand-500 rounded-xl"
            aria-label="Save and close accessibility profile"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* Section 1: Disability & Mobility Options */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
            <span className="w-6 h-6 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center">1</span>
            <span>Select Mobility & Accessibility Profile (Choose all that apply)</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {DISABILITY_OPTIONS.map((item) => {
              const isSelected = profile.disabilities.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    toggleDisability(item.id);
                    speakText(`${item.label} ${isSelected ? 'removed' : 'selected'}`);
                  }}
                  className={`p-3.5 rounded-2xl border text-left flex items-start space-x-3 transition-all focus:outline-none focus:ring-4 focus:ring-brand-400 ${
                    isSelected
                      ? 'bg-brand-50 dark:bg-brand-950/80 border-brand-500 text-brand-900 dark:text-brand-100 shadow-sm ring-2 ring-brand-500'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                  aria-pressed={isSelected}
                >
                  <span className="text-xl" aria-hidden="true">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold block truncate">{item.label}</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block">{item.category}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0 mt-0.5" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Venue Requirements & Preferences */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
            <span className="w-6 h-6 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center">2</span>
            <span>Required Venue Features & Accommodations</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {PREFERENCE_OPTIONS.map((pref) => {
              const isSelected = profile.preferences.includes(pref.id);
              return (
                <button
                  key={pref.id}
                  onClick={() => {
                    togglePreference(pref.id);
                    speakText(`${pref.label} ${isSelected ? 'un-checked' : 'checked'}`);
                  }}
                  className={`p-3 rounded-2xl border text-left flex items-center space-x-3 transition-all focus:outline-none focus:ring-4 focus:ring-brand-400 ${
                    isSelected
                      ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-bold shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                  aria-pressed={isSelected}
                >
                  <span className="text-lg">{pref.icon}</span>
                  <span className="text-xs flex-1">{pref.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Physical Limits (Walking & Slope Thresholds) */}
        <div className="space-y-4 p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-brand-500" />
            <span>AI Pathfinding Physical Thresholds</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Max Walking Distance */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Maximum Walking Distance</span>
                <span className="text-brand-600 dark:text-brand-400">{profile.maxWalkingMeters || 800} meters</span>
              </div>
              <input
                type="range"
                min="200"
                max="2000"
                step="100"
                value={profile.maxWalkingMeters || 800}
                onChange={(e) => updateProfile({ maxWalkingMeters: Number(e.target.value) })}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-600"
              />
            </div>

            {/* Max Slope Gradient */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Maximum Slope Incline</span>
                <span className="text-brand-600 dark:text-brand-400">{profile.maxSlopePercent || 5}% Gradient</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={profile.maxSlopePercent || 5}
                onChange={(e) => updateProfile({ maxSlopePercent: Number(e.target.value) })}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-600"
              />
            </div>
          </div>
        </div>

        {/* Footer / Save Button */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-2 text-slate-500 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 text-emerald-500" />
            <span>Profile saved automatically to your device</span>
          </div>

          <button
            onClick={() => {
              speakText('Accessibility profile updated successfully.');
              onClose();
            }}
            className="px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-brand-400 transition-all hover:scale-105"
          >
            Apply Profile & Personalize App
          </button>
        </div>
      </div>
    </div>
  );
};
