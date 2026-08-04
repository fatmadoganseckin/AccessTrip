import { UserAccessibilityProfile } from '../types/accessibility';
import { TripItinerary } from '../types/itinerary';

export interface AIResponse {
  message: string;
  suggestedItinerary?: TripItinerary;
  accessibilityAlerts?: string[];
  restStopCount?: number;
  maxSlopeDetected?: string;
  recommendedVenues?: { name: string; type: string; badge: string; reason: string }[];
}

export function queryAIAssistant(
  prompt: string,
  profile: UserAccessibilityProfile
): Promise<AIResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const p = prompt.toLowerCase();

      // Check if prompt asks for Barcelona
      if (p.includes('barcelona')) {
        resolve({
          message: `I've analyzed Barcelona for your profile (${profile.disabilities.join(', ')}). Barcelona is exceptionally flat along the coast and Eixample grid, with 100% ramped buses and 91% glass-elevator metro stations. Here is your customized, low-energy step-free 5-day itinerary!`,
          suggestedItinerary: {
            id: `ai-bcn-${Date.now()}`,
            destinationId: 'barcelona-spain',
            destinationName: 'Barcelona',
            title: '5-Day Custom Step-Free Barcelona Itinerary',
            daysCount: 5,
            mobilityFocus: profile.disabilities.includes('power_wheelchair') ? 'Power Wheelchair Rapid Charging & Flat Routes' : 'Manual Wheelchair & Elevator Priority',
            createdDate: 'Today',
            days: [
              {
                dayNumber: 1,
                dateStr: 'Day 1',
                title: 'Passeig de Gràcia & Gothic Quarter Flat Trail',
                totalDistanceMeters: 950,
                totalElevationGain: 4,
                activities: [
                  {
                    id: 'ai-act-1',
                    title: 'Casa Batlló Priority Elevator Tour',
                    category: 'attraction',
                    time: '10:00 AM',
                    durationMinutes: 90,
                    locationName: 'Casa Batlló',
                    address: 'Passeig de Gràcia, 43',
                    accessibilityBadges: ['Priority Lift', 'Audio Guide', 'Tactile Map'],
                    stepFreeAccess: true,
                    elevatorStatus: 'working',
                    restroomsAvailable: true,
                    walkingDistanceMeters: 250,
                    elevationGainMeters: 1,
                    energyExpenditure: 'Low',
                    notes: 'Step-free entrance with wide glass elevator.',
                    lat: 41.3917,
                    lng: 2.1649
                  },
                  {
                    id: 'ai-act-2',
                    title: 'Rest & Charge Stop: Passeig de Gràcia Square',
                    category: 'rest_stop',
                    time: '12:00 PM',
                    durationMinutes: 45,
                    locationName: 'Gràcia Bench Hub',
                    address: 'Passeig de Gràcia',
                    accessibilityBadges: ['Shaded Benches', 'Power Charging'],
                    stepFreeAccess: true,
                    elevatorStatus: 'n/a',
                    restroomsAvailable: true,
                    walkingDistanceMeters: 100,
                    elevationGainMeters: 0,
                    energyExpenditure: 'Low',
                    notes: 'Quiet rest stop with accessible public bathroom.',
                    lat: 41.3912,
                    lng: 2.1649
                  }
                ]
              }
            ]
          },
          accessibilityAlerts: [
            'Avoid Park Güell upper trail (12% steep incline); take lower step-free bus #24 drop-off instead.',
            'Metro L3 Passeig de Gràcia elevator #2 has minor maintenance scheduled from 14:00-16:00.'
          ],
          restStopCount: 6,
          maxSlopeDetected: '2.5% (Very Flat)',
          recommendedVenues: [
            { name: 'Sagrada Família', type: 'Attraction', badge: '100% Step-Free', reason: 'Dedicated priority elevator to Nativity facade with complimentary wheelchair loans.' },
            { name: 'Barceloneta Beach Deck', type: 'Outdoors', badge: 'Amphibious Chairs', reason: 'Wooden boardwalk direct to water edge with trained accessibility lifeguards.' },
            { name: 'Can Culleretes', type: 'Dining', badge: 'Accessible Toilet', reason: 'Ground level step-free entry with spacious accessible restrooms.' }
          ]
        });
        return;
      }

      // Check quiet museums query
      if (p.includes('quiet') || p.includes('museum')) {
        resolve({
          message: `Based on your sensory sensitivity preferences, here are verified quiet, low-stimulus cultural venues with designated quiet hours, dim sensory lighting options, and step-free access:`,
          accessibilityAlerts: ['Sensory bags with noise-canceling headphones & fidget tools are available free at the entrance desk.'],
          restStopCount: 4,
          maxSlopeDetected: '0% (Level Interior)',
          recommendedVenues: [
            { name: 'Picasso Museum (Quiet Morning Slots)', type: 'Museum', badge: 'Low Crowd Sensory Hours', reason: 'Tuesdays 09:00-11:00 AM features 50% reduced capacity and silenced audio chimes.' },
            { name: 'Parc de la Ciutadella Glasshouse', type: 'Botanical', badge: 'Calming Nature Sanctuary', reason: 'Serene indoor botanical garden with acoustic sound dampening and shaded benches.' }
          ]
        });
        return;
      }

      // Metro elevator query
      if (p.includes('metro') || p.includes('station') || p.includes('elevator')) {
        resolve({
          message: `Here is the real-time elevator status map for public transit lines. 94% of audited metro stations along your planned route are currently 100% operational with dual-side glass elevators.`,
          accessibilityAlerts: [
            'All metro platforms feature tactile ground warning strips 60cm from the platform edge.',
            'Train-to-platform gap is less than 3cm on lines L1, L2, L9, and L10.'
          ],
          restStopCount: 3,
          maxSlopeDetected: '0% (Level Boarding)',
          recommendedVenues: [
            { name: 'Passeig de Gràcia Hub (L2/L3/L4)', type: 'Metro Station', badge: 'Dual Elevators Working', reason: 'Full street-to-platform elevator access with automated audio announcements.' },
            { name: 'Sagrada Família Station (L5)', type: 'Metro Station', badge: 'Level Platform Gap', reason: 'Hydraulic lift to street level right beside temple ticket counter.' }
          ]
        });
        return;
      }

      // Default prompt response
      resolve({
        message: `I've processed your query for your profile (${profile.disabilities.join(', ')}). All suggestions are filtered for max slope under ${profile.maxSlopePercent || 5}% and step-free access.`,
        accessibilityAlerts: ['Elevators and step-free access verified within the last 24 hours.'],
        restStopCount: 3,
        maxSlopeDetected: '3.0% (Flat/Gentle)',
        recommendedVenues: [
          { name: 'Historic City Center Boardwalk', type: 'Attraction', badge: '100% Step-Free', reason: 'Flat paved promenade with rest benches every 50 meters.' },
          { name: 'Accessible Waterfront Bistro', type: 'Dining', badge: 'ADA Toilet', reason: 'Spacious seating, zero threshold entrance, lowered counter.' }
        ]
      });
    }, 1200);
  });
}
