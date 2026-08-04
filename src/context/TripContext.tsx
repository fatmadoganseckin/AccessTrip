import React, { createContext, useContext, useState } from 'react';
import { Destination } from '../types/destination';
import { TripItinerary, ItineraryActivity } from '../types/itinerary';
import { StructuredAccessibilityReview } from '../types/review';
import { AccessibilityDisruptionAlert } from '../types/notification';
import { MOCK_DESTINATIONS } from '../data/mockDestinations';
import { MOCK_REVIEWS } from '../data/mockReviews';
import { MOCK_NOTIFICATIONS } from '../data/mockNotifications';

interface TripContextType {
  destinations: Destination[];
  reviews: StructuredAccessibilityReview[];
  notifications: AccessibilityDisruptionAlert[];
  activeDestination: Destination | null;
  setActiveDestination: (dest: Destination | null) => void;
  activeItinerary: TripItinerary | null;
  setActiveItinerary: (itin: TripItinerary | null) => void;
  addReview: (review: Omit<StructuredAccessibilityReview, 'id' | 'date' | 'helpfulCount'>) => void;
  markHelpful: (reviewId: string) => void;
  reorderItineraryActivities: (dayIndex: number, startIndex: number, endIndex: number) => void;
  addActivityToItinerary: (dayIndex: number, activity: ItineraryActivity) => void;
  removeActivityFromItinerary: (dayIndex: number, activityId: string) => void;
  activeTab: 'landing' | 'explorer' | 'assistant' | 'planner' | 'dashboard' | 'reviews' | 'map';
  setActiveTab: (tab: 'landing' | 'explorer' | 'assistant' | 'planner' | 'dashboard' | 'reviews' | 'map') => void;
}

const DEFAULT_ITINERARY: TripItinerary = {
  id: 'itin-bcn-1',
  destinationId: 'barcelona-spain',
  destinationName: 'Barcelona',
  title: '5-Day Wheelchair-Accessible Mediterranean Journey',
  daysCount: 5,
  mobilityFocus: 'Power Wheelchair & Step-Free Transit',
  createdDate: 'August 2026',
  days: [
    {
      dayNumber: 1,
      dateStr: 'Day 1 - Gothic Quarter & Ramblas',
      title: 'Historical Discovery & Flat Promenade Walk',
      totalDistanceMeters: 1400,
      totalElevationGain: 12,
      activities: [
        {
          id: 'act-1',
          title: 'Barcelona Cathedral Step-Free Tour',
          category: 'attraction',
          time: '09:30 AM',
          durationMinutes: 90,
          locationName: 'Plaça de la Seu',
          address: 'Plaça de la Seu, s/n, 08002 Barcelona',
          accessibilityBadges: ['Step-Free Ramp', 'Elevator', 'Accessible Restroom'],
          stepFreeAccess: true,
          elevatorStatus: 'working',
          restroomsAvailable: true,
          walkingDistanceMeters: 300,
          elevationGainMeters: 2,
          energyExpenditure: 'Low',
          notes: 'Entrance via Carrer del Bisbe ramp.',
          lat: 41.3839,
          lng: 2.1762
        },
        {
          id: 'act-2',
          title: 'Lunch at Can Culleretes (100% Step-Free Dining)',
          category: 'dining',
          time: '01:00 PM',
          durationMinutes: 75,
          locationName: 'Can Culleretes',
          address: 'Carrer d\'en Quintana, 5, 08002 Barcelona',
          accessibilityBadges: ['Wide Doors', 'Accessible Toilet'],
          stepFreeAccess: true,
          elevatorStatus: 'n/a',
          restroomsAvailable: true,
          walkingDistanceMeters: 400,
          elevationGainMeters: 4,
          energyExpenditure: 'Low',
          notes: 'Oldest restaurant in Barcelona, ground level step-free.',
          lat: 41.3808,
          lng: 2.1738
        },
        {
          id: 'act-3',
          title: 'La Rambla Promenade & Boqueria Market',
          category: 'attraction',
          time: '03:30 PM',
          durationMinutes: 120,
          locationName: 'Mercat de la Boqueria',
          address: 'La Rambla, 91, 08001 Barcelona',
          accessibilityBadges: ['Wide Aisles', 'Tactile Paving'],
          stepFreeAccess: true,
          elevatorStatus: 'n/a',
          restroomsAvailable: true,
          walkingDistanceMeters: 700,
          elevationGainMeters: 6,
          energyExpenditure: 'Moderate',
          notes: 'Wide paved pedestrian path with lowered vendor stalls.',
          lat: 41.3817,
          lng: 2.1715
        }
      ]
    },
    {
      dayNumber: 2,
      dateStr: 'Day 2 - Sagrada Família & Eixample',
      title: 'Modernisme Architecture & High-Speed Elevators',
      totalDistanceMeters: 1100,
      totalElevationGain: 8,
      activities: [
        {
          id: 'act-4',
          title: 'Basílica de la Sagrada Família Priority Elevator Tour',
          category: 'attraction',
          time: '10:00 AM',
          durationMinutes: 120,
          locationName: 'Sagrada Família',
          address: 'Carrer de Mallorca, 401, 08013 Barcelona',
          accessibilityBadges: ['Priority Elevator', 'Audio Description', 'Braille Map'],
          stepFreeAccess: true,
          elevatorStatus: 'working',
          restroomsAvailable: true,
          walkingDistanceMeters: 500,
          elevationGainMeters: 3,
          energyExpenditure: 'Low',
          notes: 'Fast-track entry for wheelchair users & companions.',
          lat: 41.4036,
          lng: 2.1744
        },
        {
          id: 'act-5',
          title: 'Passeig de Gràcia Shopping & Casa Batlló',
          category: 'attraction',
          time: '02:30 PM',
          durationMinutes: 90,
          locationName: 'Casa Batlló',
          address: 'Passeig de Gràcia, 43, 08007 Barcelona',
          accessibilityBadges: ['Smart Lift', 'Tactile Model', 'Wheelchair Loan'],
          stepFreeAccess: true,
          elevatorStatus: 'working',
          restroomsAvailable: true,
          walkingDistanceMeters: 600,
          elevationGainMeters: 5,
          energyExpenditure: 'Low',
          notes: 'Elevator reaches all floor exhibitions.',
          lat: 41.3917,
          lng: 2.1649
        }
      ]
    }
  ]
};

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [destinations] = useState<Destination[]>(MOCK_DESTINATIONS);
  const [reviews, setReviews] = useState<StructuredAccessibilityReview[]>(MOCK_REVIEWS);
  const [notifications] = useState<AccessibilityDisruptionAlert[]>(MOCK_NOTIFICATIONS);
  const [activeDestination, setActiveDestination] = useState<Destination | null>(MOCK_DESTINATIONS[0]);
  const [activeItinerary, setActiveItinerary] = useState<TripItinerary | null>(DEFAULT_ITINERARY);
  const [activeTab, setActiveTab] = useState<'landing' | 'explorer' | 'assistant' | 'planner' | 'dashboard' | 'reviews' | 'map'>('landing');

  const addReview = (newReview: Omit<StructuredAccessibilityReview, 'id' | 'date' | 'helpfulCount'>) => {
    const created: StructuredAccessibilityReview = {
      ...newReview,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      helpfulCount: 0,
    };
    setReviews(prev => [created, ...prev]);
  };

  const markHelpful = (reviewId: string) => {
    setReviews(prev =>
      prev.map(r => (r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
  };

  const reorderItineraryActivities = (dayIndex: number, startIndex: number, endIndex: number) => {
    if (!activeItinerary) return;
    const newDays = [...activeItinerary.days];
    const day = newDays[dayIndex];
    if (!day) return;

    const result = Array.from(day.activities);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    newDays[dayIndex] = {
      ...day,
      activities: result,
    };

    setActiveItinerary({
      ...activeItinerary,
      days: newDays,
    });
  };

  const addActivityToItinerary = (dayIndex: number, activity: ItineraryActivity) => {
    if (!activeItinerary) return;
    const newDays = [...activeItinerary.days];
    const day = newDays[dayIndex];
    if (!day) return;

    newDays[dayIndex] = {
      ...day,
      activities: [...day.activities, activity],
      totalDistanceMeters: day.totalDistanceMeters + activity.walkingDistanceMeters,
      totalElevationGain: day.totalElevationGain + activity.elevationGainMeters,
    };

    setActiveItinerary({
      ...activeItinerary,
      days: newDays,
    });
  };

  const removeActivityFromItinerary = (dayIndex: number, activityId: string) => {
    if (!activeItinerary) return;
    const newDays = [...activeItinerary.days];
    const day = newDays[dayIndex];
    if (!day) return;

    const filtered = day.activities.filter(a => a.id !== activityId);
    const removedAct = day.activities.find(a => a.id === activityId);

    newDays[dayIndex] = {
      ...day,
      activities: filtered,
      totalDistanceMeters: Math.max(0, day.totalDistanceMeters - (removedAct?.walkingDistanceMeters || 0)),
      totalElevationGain: Math.max(0, day.totalElevationGain - (removedAct?.elevationGainMeters || 0)),
    };

    setActiveItinerary({
      ...activeItinerary,
      days: newDays,
    });
  };

  return (
    <TripContext.Provider
      value={{
        destinations,
        reviews,
        notifications,
        activeDestination,
        setActiveDestination,
        activeItinerary,
        setActiveItinerary,
        addReview,
        markHelpful,
        reorderItineraryActivities,
        addActivityToItinerary,
        removeActivityFromItinerary,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within TripProvider');
  }
  return context;
};
