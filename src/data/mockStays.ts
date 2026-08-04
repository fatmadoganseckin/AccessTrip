import { AccessibleStay } from '../types/stay';

export const MOCK_STAYS: AccessibleStay[] = [
  {
    id: 'stay-madrid-1',
    title: 'Design Apartment in Madrid',
    subtitle: 'Modern step-free city luxury near El Retiro Park',
    location: 'Madrid, Spain',
    city: 'Madrid',
    country: 'Spain',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.92,
    reviewCount: 128,
    pricePerNight: 132,
    totalPriceForStay: 660,
    stayType: 'Apartment',
    verifiedBadge: 'Service animal friendly',
    hostName: 'Carlos M.',
    hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    hostBadge: 'Superhost • Accessibility Certified',
    matchPercentage: 92,
    matchChecklist: {
      passed: [
        'Step-free entrance with automated glass doors',
        'Spacious elevator (90 cm clearance)',
        'Roll-in shower with fold-down bench',
        'Service animals welcome with no additional fee',
        'Lowered kitchen countertops & accessible outlets'
      ],
      warnings: [
        'Bathroom doorway clearance is 82 cm (verify power wheelchair width)'
      ]
    },
    featureIcons: [
      { icon: '♿', label: 'Step-free' },
      { icon: '🛗', label: 'Elevator' },
      { icon: '🚿', label: 'Roll-in shower' },
      { icon: '🍳', label: 'Kitchen' },
    ],
    coordinates: { lat: 40.4168, lng: -3.7038 },
    description: 'Designed in collaboration with accessibility architects, this sunlit apartment offers zero-threshold entry throughout, wide interior hallways, and seamless transition from living room to private terrace.',
    accessibilityHighlights: [
      'Zero-threshold sliding terrace doors',
      'Lever door handles throughout',
      'Emergency pull cords linked to 24/7 concierge',
      'Tactile floor markings to elevator bank'
    ]
  },
  {
    id: 'stay-lisbon-2',
    title: 'Cozy Loft in Lisbon',
    subtitle: 'Flat riverside location with level elevator access',
    location: 'Lisbon, Portugal',
    city: 'Lisbon',
    country: 'Portugal',
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.89,
    reviewCount: 96,
    pricePerNight: 98,
    totalPriceForStay: 490,
    stayType: 'Loft',
    verifiedBadge: 'Pet friendly - No pet fee',
    hostName: 'Inês S.',
    hostAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    hostBadge: 'Superhost',
    matchPercentage: 90,
    matchChecklist: {
      passed: [
        'Step-free access from street level',
        'Dual elevators with audio voice announcements',
        'Extra-wide 95cm doorway entry',
        'Service animal relief area nearby in Parque das Nações'
      ],
      warnings: [
        'Shower has 2 cm lip threshold'
      ]
    },
    featureIcons: [
      { icon: '♿', label: 'Step-free' },
      { icon: '🛗', label: 'Elevator' },
      { icon: '🚪', label: 'Wide door' },
      { icon: '🐕‍🦺', label: 'Pet welcome' },
    ],
    coordinates: { lat: 38.7223, lng: -9.1393 },
    description: 'Located in Lisbon\'s flat waterfront district, this open-concept loft avoids Lisbon\'s famous hills. Level access straight to the Tagus River promenade.',
    accessibilityHighlights: [
      'Level entrance with no cobblestone obstacles',
      'Lowered bed height (50 cm from floor)',
      'Acoustic sound dampening for sensory comfort'
    ]
  },
  {
    id: 'stay-bali-3',
    title: 'Beachfront Villa in Bali',
    subtitle: 'Tropical luxury with hydraulic pool lift & ramps',
    location: 'Bali, Indonesia',
    city: 'Bali',
    country: 'Indonesia',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.95,
    reviewCount: 203,
    pricePerNight: 176,
    totalPriceForStay: 880,
    stayType: 'Villa',
    verifiedBadge: 'Step-free stay',
    hostName: 'Wayan K.',
    hostAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    hostBadge: 'Accessibility Ambassador',
    matchPercentage: 95,
    matchChecklist: {
      passed: [
        '100% step-free stone boardwalk from villa to ocean',
        'Hydraulic pool lift installed at private infinity pool',
        'Quiet sensory zone with acoustic rainforest garden',
        'Accessible airport transfer shuttle included with ramp'
      ],
      warnings: [
        'Garden path wet after rain (non-slip coating applied)'
      ]
    },
    featureIcons: [
      { icon: '♿', label: 'Step-free' },
      { icon: '🏊', label: 'Pool lift' },
      { icon: '🤫', label: 'Quiet room' },
      { icon: '🚐', label: 'Airport transfer' },
    ],
    coordinates: { lat: -8.4095, lng: 115.1889 },
    description: 'A paradise built for universal relaxation. Every room connects via level paved ramps. Dedicated staff trained in mobility transfers and service animal care.',
    accessibilityHighlights: [
      'Custom aquatic wheelchair provided',
      'Master suite featuring dual grab bars & roll-in shower',
      '24/7 staff trained in accessible assistance'
    ]
  },
  {
    id: 'stay-dubai-4',
    title: 'Accessible Hotel in Dubai',
    subtitle: 'Ultra-modern five-star suite with smart room controls',
    location: 'Dubai, UAE',
    city: 'Dubai',
    country: 'United Arab Emirates',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.91,
    reviewCount: 176,
    pricePerNight: 152,
    totalPriceForStay: 760,
    stayType: 'Hotel',
    verifiedBadge: 'Accessible hotel',
    hostName: 'Grand Hyatt Dubai',
    hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    hostBadge: 'Verified Hotel Partner',
    matchPercentage: 91,
    matchChecklist: {
      passed: [
        'Voice-controlled lights, curtains, and climate via smart tablet',
        'Sturdy stainless steel grab bars on both sides of toilet',
        'High-speed glass elevator to all 30 floors',
        'Reserved valet parking with extra-wide wheelchair access'
      ],
      warnings: [
        'Heavy entry door requires automatic push button'
      ]
    },
    featureIcons: [
      { icon: '♿', label: 'Step-free' },
      { icon: '🚽', label: 'Grab bars' },
      { icon: '🛗', label: 'Elevator' },
      { icon: '🅿️', label: 'Accessible parking' },
    ],
    coordinates: { lat: 25.2048, lng: 55.2708 },
    description: 'Offering world-class universal design in Downtown Dubai. Direct indoor climate-controlled bridge connection to Dubai Mall and Metro line.',
    accessibilityHighlights: [
      'Braille room signage and audio elevator cues',
      'Lowered reception check-in counter',
      'Roll-in shower with handheld showerhead'
    ]
  }
];
