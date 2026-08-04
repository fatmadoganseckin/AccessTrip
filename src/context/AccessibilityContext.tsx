import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserAccessibilityProfile, AccessibilitySettings, DisabilityType, PreferenceKey, HighContrastMode } from '../types/accessibility';

interface AccessibilityContextType {
  profile: UserAccessibilityProfile;
  settings: AccessibilitySettings;
  updateProfile: (newProfile: Partial<UserAccessibilityProfile>) => void;
  toggleDisability: (disability: DisabilityType) => void;
  togglePreference: (preference: PreferenceKey) => void;
  updateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
  resetAccessibility: () => void;
  speakText: (text: string) => void;
  isSpeaking: boolean;
  stopSpeaking: () => void;
  isVoiceListening: boolean;
  startVoiceListening: (onResult: (transcript: string) => void) => void;
  stopVoiceListening: () => void;
}

const DEFAULT_PROFILE: UserAccessibilityProfile = {
  disabilities: ['manual_wheelchair'],
  preferences: ['elevator_required', 'step_free_access', 'accessible_bathroom', 'accessible_transportation'],
  maxWalkingMeters: 800,
  maxSlopePercent: 5,
  preferredLanguage: 'English',
  emergencyContact: {
    name: 'Sarah Connor',
    phone: '+1 (555) 019-2834',
    relationship: 'Family Member',
  }
};

const DEFAULT_SETTINGS: AccessibilitySettings = {
  fontScale: 100,
  highContrast: 'none',
  dyslexiaFont: false,
  reducedMotion: false,
  screenReaderMode: false,
  voiceMode: false,
  darkMode: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserAccessibilityProfile>(() => {
    const saved = localStorage.getItem('accesstrip_user_profile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem('accesstrip_accessibility_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVoiceListening, setIsVoiceListening] = useState(false);

  // Save profile to localStorage
  useEffect(() => {
    localStorage.setItem('accesstrip_user_profile', JSON.stringify(profile));
  }, [profile]);

  // Save and apply settings to body / html tag
  useEffect(() => {
    localStorage.setItem('accesstrip_accessibility_settings', JSON.stringify(settings));

    const htmlEl = document.documentElement;

    // Font Scale
    htmlEl.style.fontSize = `${(settings.fontScale / 100) * 16}px`;

    // Dark Mode
    if (settings.darkMode) {
      htmlEl.classList.add('dark');
    } else {
      htmlEl.classList.remove('dark');
    }

    // Dyslexia Font
    if (settings.dyslexiaFont) {
      htmlEl.classList.add('font-dyslexia');
    } else {
      htmlEl.classList.remove('font-dyslexia');
    }

    // Reduced Motion
    if (settings.reducedMotion) {
      htmlEl.classList.add('reduce-motion');
    } else {
      htmlEl.classList.remove('reduce-motion');
    }

    // High Contrast Modes
    htmlEl.classList.remove('contrast-light', 'contrast-dark', 'yellow-on-black');
    if (settings.highContrast !== 'none') {
      htmlEl.classList.add(settings.highContrast);
    }
  }, [settings]);

  const updateProfile = (newProfile: Partial<UserAccessibilityProfile>) => {
    setProfile(prev => ({ ...prev, ...newProfile }));
  };

  const toggleDisability = (disability: DisabilityType) => {
    setProfile(prev => {
      const exists = prev.disabilities.includes(disability);
      const updated = exists
        ? prev.disabilities.filter(d => d !== disability)
        : [...prev.disabilities, disability];
      return { ...prev, disabilities: updated };
    });
  };

  const togglePreference = (preference: PreferenceKey) => {
    setProfile(prev => {
      const exists = prev.preferences.includes(preference);
      const updated = exists
        ? prev.preferences.filter(p => p !== preference)
        : [...prev.preferences, preference];
      return { ...prev, preferences: updated };
    });
  };

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetAccessibility = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  // Text-To-Speech
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Speech Recognition Simulator / Web Speech API
  const startVoiceListening = (onResult: (transcript: string) => void) => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsVoiceListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
        setIsVoiceListening(false);
      };
      recognition.onerror = () => setIsVoiceListening(false);
      recognition.onend = () => setIsVoiceListening(false);
      recognition.start();
    } else {
      // Simulation fallback for browsers without SpeechRecognition
      setIsVoiceListening(true);
      setTimeout(() => {
        onResult('Plan a 5-day wheelchair accessible trip to Barcelona');
        setIsVoiceListening(false);
      }, 2500);
    }
  };

  const stopVoiceListening = () => {
    setIsVoiceListening(false);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        profile,
        settings,
        updateProfile,
        toggleDisability,
        togglePreference,
        updateSettings,
        resetAccessibility,
        speakText,
        isSpeaking,
        stopSpeaking,
        isVoiceListening,
        startVoiceListening,
        stopVoiceListening,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};
