import { Destination } from '../types/destination';

export const MOCK_DESTINATIONS: Destination[] = [
  {
    id: 'barcelona-spain',
    name: 'Barcelona',
    country: 'Spain',
    region: 'Europe',
    tagline: 'World leader in urban accessibility & step-free Mediterranean beaches',
    description: 'Barcelona is widely recognized as one of Europe\'s most accessible cities. 100% of municipal buses feature automated drop-down ramps, 91% of metro stations are equipped with spacious glass elevators, and the famous Barceloneta beach offers amphibious wheelchairs, wooden boardwalks directly to the shore, and trained accessibility lifeguards.',
    heroImage: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579282240050-352db0a14c21?auto=format&fit=crop&w=800&q=80'
    ],
    coordinates: { lat: 41.3851, lng: 2.1734 },
    scores: {
      overall: 94,
      transportation: 96,
      accommodation: 92,
      restaurant: 90,
      attraction: 95,
      medicalSupport: 94,
      sidewalkQuality: 92,
      elevatorAvailability: 95,
      restroomAvailability: 88,
    },
    features: {
      serviceAnimalFriendly: true,
      quietAreasAvailable: true,
      brailleSignage: true,
      audioGuidesAvailable: true,
      tactilePaving: true,
      chargingStationsCount: 14,
    },
    climate: 'Mediterranean',
    budget: '$$$',
    walkingDifficulty: 'Easy (Flat)',
    crowdLevel: 'Moderate',
    safetyRating: 4.8,
    weather: { tempC: 24, condition: 'Sunny', humidity: 55 },
    airQualityIndex: { score: 1, label: 'Good (AQI 22)' },
    crowdPredictionToday: [
      { time: '08:00', level: 25 },
      { time: '11:00', level: 75 },
      { time: '14:00', level: 85 },
      { time: '17:00', level: 60 },
      { time: '20:00', level: 45 },
    ],
    emergencyContacts: {
      medical: '112',
      police: '092',
      accessibleTaxi: '+34 933 033 033 (EuroTaxi Barcelona)',
      embassy: '+34 932 802 222',
    },
    nearbyHospitals: [
      {
        name: 'Hospital Clínic de Barcelona',
        distanceKm: 1.2,
        phone: '+34 932 275 400',
        hasWheelchairER: true,
        address: 'Carrer de Villarroel, 170, 08036 Barcelona',
        lat: 41.3892,
        lng: 2.1534
      },
      {
        name: 'Hospital de la Santa Creu i Sant Pau',
        distanceKm: 2.8,
        phone: '+34 932 919 000',
        hasWheelchairER: true,
        address: 'Carrer de Sant Quintí, 89, 08041 Barcelona',
        lat: 41.4115,
        lng: 2.1751
      }
    ],
    mapPoints: [
      { id: 'bcn-m1', name: 'Passeig de Gràcia Metro Station Elevator', type: 'elevator', lat: 41.3912, lng: 2.1649, address: 'Passeig de Gràcia, Barcelona', isAccessible: true, notes: 'Dual-side glass elevator to platforms L2, L3, L4.' },
      { id: 'bcn-m2', name: 'Barceloneta Accessible Beach Point', type: 'attraction', lat: 41.3784, lng: 2.1895, address: 'Passeig Marítim de la Barceloneta', isAccessible: true, notes: 'Step-free wooden deck, aquatic wheelchair hoist, accessible changing rooms.' },
      { id: 'bcn-m3', name: 'Sagrada Família Step-Free Entrance', type: 'attraction', lat: 41.4036, lng: 2.1744, address: 'Carrer de Mallorca, 401', isAccessible: true, notes: 'Priority elevator to Nativity Tower, wheelchair ramps at main portal.' },
      { id: 'bcn-m4', name: 'Power Wheelchair Rapid Charging Station', type: 'charging', lat: 41.3879, lng: 2.1699, address: 'Plaça de Catalunya Civic Hub', isAccessible: true, notes: 'Free 220V fast charger with universal pin adapters.' },
      { id: 'bcn-m5', name: 'Parc de la Ciutadella Quiet Zone', type: 'quiet', lat: 41.3882, lng: 2.1874, address: 'Passeig de Picasso', isAccessible: true, notes: 'Low sensory noise rating, shaded benches, smooth stone pathways.' },
      { id: 'bcn-m6', name: 'Plaça Catalunya Accessible Restroom', type: 'restroom', lat: 41.3870, lng: 2.1700, address: 'Plaça Catalunya Underground', isAccessible: true, notes: 'Automated sliding door, dual support bars, emergency call cord.' },
    ],
    matchedPreferences: [
      'elevator_required',
      'step_free_access',
      'accessible_bathroom',
      'accessible_transportation',
      'service_animal_support',
      'accessible_parking',
      'rest_areas'
    ],
    verifiedStatus: true,
    lastUpdated: 'August 2026 (Verified by Municipal Accessibility Inspector)',
    aiSummary: 'Barcelona earns a 94/100 score for wheelchair users and low-walking travelers. Curbs feature gentle 0° sloped ramps at every intersection. The entire city center is flat with zero steep inclines until Montjuïc (which is served by an accessible cable car).'
  },
  {
    id: 'tokyo-japan',
    name: 'Tokyo',
    country: 'Japan',
    region: 'Asia',
    tagline: 'World benchmark for tactile paving, step-free transit & immaculate barrier-free design',
    description: 'Tokyo sets the international gold standard for universal design. Over 96% of Tokyo metro and Toei train stations are 100% barrier-free with level train-to-platform access, tactile paving (Tenji blocks) spanning millions of meters, and universal multi-purpose restrooms (Dare-demo-Toire) at every station.',
    heroImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=800&q=80'
    ],
    coordinates: { lat: 35.6762, lng: 139.6503 },
    scores: {
      overall: 96,
      transportation: 98,
      accommodation: 94,
      restaurant: 92,
      attraction: 96,
      medicalSupport: 98,
      sidewalkQuality: 98,
      elevatorAvailability: 96,
      restroomAvailability: 97,
    },
    features: {
      serviceAnimalFriendly: true,
      quietAreasAvailable: true,
      brailleSignage: true,
      audioGuidesAvailable: true,
      tactilePaving: true,
      chargingStationsCount: 22,
    },
    climate: 'Temperate',
    budget: '$$$$',
    walkingDifficulty: 'Easy (Flat)',
    crowdLevel: 'High',
    safetyRating: 4.9,
    weather: { tempC: 22, condition: 'Clear', humidity: 48 },
    airQualityIndex: { score: 1, label: 'Excellent (AQI 14)' },
    crowdPredictionToday: [
      { time: '08:00', level: 90 },
      { time: '11:00', level: 60 },
      { time: '14:00', level: 50 },
      { time: '17:00', level: 85 },
      { time: '20:00', level: 40 },
    ],
    emergencyContacts: {
      medical: '119',
      police: '110',
      accessibleTaxi: '+81 3 3814 1111 (Nihon Kotsu Universal Taxi)',
      embassy: '+81 3 3224 5000',
    },
    nearbyHospitals: [
      {
        name: 'St. Luke\'s International Hospital Tokyo',
        distanceKm: 0.9,
        phone: '+81 3 3541 5151',
        hasWheelchairER: true,
        address: '9-1 Akashicho, Chuo City, Tokyo 104-8560',
        lat: 35.6672,
        lng: 139.7745
      }
    ],
    mapPoints: [
      { id: 'tyo-m1', name: 'Shinjuku Station South Gate Elevator', type: 'elevator', lat: 35.6895, lng: 139.7005, address: 'Shinjuku 3-Chome, Tokyo', isAccessible: true, notes: 'Direct elevator connect to JR Yamanote line and Airport Express.' },
      { id: 'tyo-m2', name: 'Sensō-ji Temple Step-Free Ramp & Elevator', type: 'attraction', lat: 35.7148, lng: 139.7967, address: '2 Chome-3-1 Asakusa, Taito City, Tokyo', isAccessible: true, notes: 'Barrier-free ramp to main hall and dedicated glass elevator.' },
      { id: 'tyo-m3', name: 'Shinjuku Gyoen National Garden Rest Area', type: 'quiet', lat: 35.6852, lng: 139.7101, address: '11 Naitomachi, Shinjuku City', isAccessible: true, notes: 'Quiet sensory green space with smooth paved wheelchair paths.' },
      { id: 'tyo-m4', name: 'Universal Accessible Restroom (Dare-demo-Toire)', type: 'restroom', lat: 35.6580, lng: 139.7016, address: 'Shibuya Scramble Crossing Hub', isAccessible: true, notes: 'Ostomy basin, height-adjustable changing bench, automatic push button door.' }
    ],
    matchedPreferences: [
      'elevator_required',
      'step_free_access',
      'accessible_bathroom',
      'accessible_transportation',
      'braille',
      'audio_assistance',
      'service_animal_support',
      'rest_areas',
      'medical_facilities_nearby'
    ],
    verifiedStatus: true,
    lastUpdated: 'July 2026 (Verified by Tokyo Metro Bureau)',
    aiSummary: 'Tokyo is an ultra-accessible metropolis. Train station staff deploy portable ramps within 30 seconds if any platform gap exceeds 2 cm. High-speed elevators and universal toilets are located in virtually every building and subway stop.'
  },
  {
    id: 'london-uk',
    name: 'London',
    country: 'United Kingdom',
    region: 'Europe',
    tagline: 'Iconic historic heritage meets modern black-cab accessibility',
    description: 'London pairs historical charm with exemplary transport accessibility. 100% of London\'s iconic Black Cabs are equipped with built-in ramps and swivel seats. Over 90 Tube and Elizabeth Line stations offer step-free access from street to train, supported by step-free river boats on the Thames.',
    heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=800&q=80'
    ],
    coordinates: { lat: 51.5074, lng: -0.1278 },
    scores: {
      overall: 91,
      transportation: 94,
      accommodation: 90,
      restaurant: 89,
      attraction: 93,
      medicalSupport: 95,
      sidewalkQuality: 88,
      elevatorAvailability: 90,
      restroomAvailability: 86,
    },
    features: {
      serviceAnimalFriendly: true,
      quietAreasAvailable: true,
      brailleSignage: true,
      audioGuidesAvailable: true,
      tactilePaving: true,
      chargingStationsCount: 11,
    },
    climate: 'Oceanic',
    budget: '$$$$',
    walkingDifficulty: 'Easy (Flat)',
    crowdLevel: 'High',
    safetyRating: 4.7,
    weather: { tempC: 19, condition: 'Partly Cloudy', humidity: 62 },
    airQualityIndex: { score: 2, label: 'Moderate (AQI 38)' },
    crowdPredictionToday: [
      { time: '08:00', level: 70 },
      { time: '11:00', level: 80 },
      { time: '14:00', level: 75 },
      { time: '17:00', level: 85 },
      { time: '20:00', level: 50 },
    ],
    emergencyContacts: {
      medical: '999',
      police: '101',
      accessibleTaxi: '+44 20 7272 0272 (Radio Taxis Accessible)',
      embassy: '+44 20 7499 9000',
    },
    nearbyHospitals: [
      {
        name: 'St Thomas\' Hospital London',
        distanceKm: 0.5,
        phone: '+44 20 7188 7188',
        hasWheelchairER: true,
        address: 'Westminster Bridge Rd, London SE1 7EH',
        lat: 51.4988,
        lng: -0.1185
      }
    ],
    mapPoints: [
      { id: 'lon-m1', name: 'Elizabeth Line Tottenham Court Road Elevator', type: 'elevator', lat: 51.5162, lng: -0.1308, address: 'Oxford St, Soho, London', isAccessible: true, notes: 'Brand new step-free station with dual high-speed incline lifts.' },
      { id: 'lon-m2', name: 'British Museum Step-Free West Entrance', type: 'attraction', lat: 51.5194, lng: -0.1270, address: 'Great Russell St, London', isAccessible: true, notes: 'Montague Place entrance features platform lift and complimentary wheelchairs.' },
      { id: 'lon-m3', name: 'Hyde Park Quiet Sanctuary', type: 'quiet', lat: 51.5073, lng: -0.1657, address: 'Kensington Gardens, London', isAccessible: true, notes: 'Expansive flat paved trails, peaceful Rose Garden sensory area.' }
    ],
    matchedPreferences: [
      'elevator_required',
      'step_free_access',
      'accessible_transportation',
      'service_animal_support',
      'audio_assistance',
      'medical_facilities_nearby'
    ],
    verifiedStatus: true,
    lastUpdated: 'August 2026 (Verified by TfL Accessibility Team)',
    aiSummary: 'London provides outstanding black-cab accessibility and step-free access across all national museums (National Gallery, Tate Modern, Science Museum). Use the Elizabeth Line for seamless 100% step-free east-west transit.'
  },
  {
    id: 'sydney-australia',
    name: 'Sydney',
    country: 'Australia',
    region: 'Oceania',
    tagline: 'Harbor breezes, fully accessible ferries & flat coastal boardwalks',
    description: 'Sydney combines breathtaking natural harbor views with world-class universal access. All Sydney Ferries operating from Circular Quay feature hydraulic level-boarding gangways, while Sydney Metro and Light Rail lines offer 100% step-free access across all stops.',
    heroImage: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?auto=format&fit=crop&w=800&q=80'
    ],
    coordinates: { lat: -33.8688, lng: 151.2093 },
    scores: {
      overall: 93,
      transportation: 95,
      accommodation: 91,
      restaurant: 93,
      attraction: 94,
      medicalSupport: 96,
      sidewalkQuality: 94,
      elevatorAvailability: 92,
      restroomAvailability: 91,
    },
    features: {
      serviceAnimalFriendly: true,
      quietAreasAvailable: true,
      brailleSignage: true,
      audioGuidesAvailable: true,
      tactilePaving: true,
      chargingStationsCount: 9,
    },
    climate: 'Subtropical',
    budget: '$$$',
    walkingDifficulty: 'Easy (Flat)',
    crowdLevel: 'Moderate',
    safetyRating: 4.9,
    weather: { tempC: 21, condition: 'Sunny', humidity: 50 },
    airQualityIndex: { score: 1, label: 'Pristine (AQI 9)' },
    crowdPredictionToday: [
      { time: '08:00', level: 35 },
      { time: '11:00', level: 65 },
      { time: '14:00', level: 70 },
      { time: '17:00', level: 55 },
      { time: '20:00', level: 30 },
    ],
    emergencyContacts: {
      medical: '000',
      police: '000',
      accessibleTaxi: '+61 13 33 22 (Zero20 Accessible Taxis)',
      embassy: '+61 2 8219 2100',
    },
    nearbyHospitals: [
      {
        name: 'St Vincent\'s Hospital Sydney',
        distanceKm: 1.5,
        phone: '+61 2 8382 1111',
        hasWheelchairER: true,
        address: '390 Victoria St, Darlinghurst NSW 2010',
        lat: -33.8795,
        lng: 151.2201
      }
    ],
    mapPoints: [
      { id: 'syd-m1', name: 'Circular Quay Ferry Wharf Step-Free Platform', type: 'metro', lat: -33.8614, lng: 151.2108, address: 'Circular Quay, Sydney', isAccessible: true, notes: 'Level boarding gangway onto all Manly and Taronga ferries.' },
      { id: 'syd-m2', name: 'Sydney Opera House Accessible Concourse Lifts', type: 'attraction', lat: -33.8568, lng: 151.2153, address: 'Bennelong Point, Sydney', isAccessible: true, notes: 'Internal wheelchair lifts connect all theater levels; complimentary mobility escorts.' },
    ],
    matchedPreferences: [
      'elevator_required',
      'step_free_access',
      'accessible_bathroom',
      'accessible_transportation',
      'service_animal_support',
      'accessible_parking'
    ],
    verifiedStatus: true,
    lastUpdated: 'August 2026 (Verified by NSW Transport Accessibility)',
    aiSummary: 'Sydney shines for outdoor accessibility. The entire harbor foreshore from the Opera House around to Barangaroo Reserve features wide, paved, step-free boardwalks with tactile ground indicators.'
  },
  {
    id: 'paris-france',
    name: 'Paris',
    country: 'France',
    region: 'Europe',
    tagline: 'Legacy Olympic accessibility upgrades, fully accessible buses & museum priority',
    description: 'Following the 2024 Paralympic Games, Paris underwent massive accessibility transformations. 100% of surface bus lines are now step-free with automated ramps, and iconic cultural institutions like the Louvre and Musée d\'Orsay provide priority fast-track elevator entries for travelers with disabilities.',
    heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80'
    ],
    coordinates: { lat: 48.8566, lng: 2.3522 },
    scores: {
      overall: 88,
      transportation: 86,
      accommodation: 88,
      restaurant: 87,
      attraction: 94,
      medicalSupport: 93,
      sidewalkQuality: 85,
      elevatorAvailability: 87,
      restroomAvailability: 82,
    },
    features: {
      serviceAnimalFriendly: true,
      quietAreasAvailable: true,
      brailleSignage: true,
      audioGuidesAvailable: true,
      tactilePaving: true,
      chargingStationsCount: 8,
    },
    climate: 'Temperate',
    budget: '$$$$',
    walkingDifficulty: 'Moderate (Mild Slopes)',
    crowdLevel: 'High',
    safetyRating: 4.6,
    weather: { tempC: 23, condition: 'Sunny', humidity: 52 },
    airQualityIndex: { score: 2, label: 'Moderate (AQI 32)' },
    crowdPredictionToday: [
      { time: '08:00', level: 60 },
      { time: '11:00', level: 90 },
      { time: '14:00', level: 85 },
      { time: '17:00', level: 75 },
      { time: '20:00', level: 60 },
    ],
    emergencyContacts: {
      medical: '15',
      police: '17',
      accessibleTaxi: '+33 1 47 39 00 00 (G7 PMR Accessible Taxi)',
      embassy: '+33 1 43 12 22 22',
    },
    nearbyHospitals: [
      {
        name: 'Hôpital Pitié-Salpêtrière Paris',
        distanceKm: 2.1,
        phone: '+33 1 42 16 00 00',
        hasWheelchairER: true,
        address: '47-83 Bd de l\'Hôpital, 75013 Paris',
        lat: 48.8394,
        lng: 2.3639
      }
    ],
    mapPoints: [
      { id: 'par-m1', name: 'Louvre Pyramid Priority Access Lift', type: 'attraction', lat: 48.8606, lng: 2.3376, address: 'Rue de Rivoli, 75001 Paris', isAccessible: true, notes: 'Helicoidal open glass elevator descends directly inside pyramid with zero wait line.' },
      { id: 'par-m2', name: 'Jardin du Luxembourg Quiet Rest Area', type: 'quiet', lat: 48.8462, lng: 2.3372, address: '75006 Paris', isAccessible: true, notes: 'Wide smooth gravel paths, accessible public restrooms near Senate entrance.' }
    ],
    matchedPreferences: [
      'elevator_required',
      'step_free_access',
      'accessible_transportation',
      'service_animal_support',
      'rest_areas'
    ],
    verifiedStatus: true,
    lastUpdated: 'July 2026 (Verified by RATP Accessibility)',
    aiSummary: 'Paris offers premier museum accessibility with free admission for disabled visitors and one companion. Buses (RATP lines) are recommended over historic Metro lines for 100% step-free travel.'
  },
  {
    id: 'san-francisco-usa',
    name: 'San Francisco',
    country: 'United States',
    region: 'North America',
    tagline: 'ADA pioneer with step-free waterfront & accessible historic streetcars',
    description: 'San Francisco is a pioneer of Americans with Disabilities Act (ADA) compliance. While famous for its rolling hills, the Embarcadero waterfront, Fisherman\'s Wharf, Golden Gate Park, and Muni F-Line streetcars are completely flat and 100% step-free equipped with hydraulic wheelchair platforms.',
    heroImage: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=800&q=80'
    ],
    coordinates: { lat: 37.7749, lng: -122.4194 },
    scores: {
      overall: 90,
      transportation: 92,
      accommodation: 93,
      restaurant: 91,
      attraction: 92,
      medicalSupport: 97,
      sidewalkQuality: 86,
      elevatorAvailability: 91,
      restroomAvailability: 93,
    },
    features: {
      serviceAnimalFriendly: true,
      quietAreasAvailable: true,
      brailleSignage: true,
      audioGuidesAvailable: true,
      tactilePaving: true,
      chargingStationsCount: 16,
    },
    climate: 'Mediterranean',
    budget: '$$$$',
    walkingDifficulty: 'Challenging (Steep)',
    crowdLevel: 'Moderate',
    safetyRating: 4.5,
    weather: { tempC: 18, condition: 'Mild Fog', humidity: 65 },
    airQualityIndex: { score: 1, label: 'Good (AQI 18)' },
    crowdPredictionToday: [
      { time: '08:00', level: 40 },
      { time: '11:00', level: 70 },
      { time: '14:00', level: 80 },
      { time: '17:00', level: 65 },
      { time: '20:00', level: 40 },
    ],
    emergencyContacts: {
      medical: '911',
      police: '911',
      accessibleTaxi: '+1 415-333-3333 (SF Paratransit Ramp Taxi)',
      embassy: '+1 415-555-0100',
    },
    nearbyHospitals: [
      {
        name: 'UCSF Medical Center at Parnassus Heights',
        distanceKm: 2.5,
        phone: '+1 415-476-1000',
        hasWheelchairER: true,
        address: '505 Parnassus Ave, San Francisco, CA 94143',
        lat: 37.7631,
        lng: -122.4578
      }
    ],
    mapPoints: [
      { id: 'sf-m1', name: 'Embarcadero BART/Muni Station Elevator', type: 'elevator', lat: 37.7929, lng: -122.3967, address: 'Market St & Speare St, SF', isAccessible: true, notes: 'ADA street-level elevator directly down to train platform.' },
      { id: 'sf-m2', name: 'Golden Gate Park Botanical Garden Accessible Trail', type: 'quiet', lat: 37.7674, lng: -122.4697, address: '1199 9th Ave, SF', isAccessible: true, notes: 'Paved, step-free trails, sensory plant garden with Braille labels.' }
    ],
    matchedPreferences: [
      'elevator_required',
      'step_free_access',
      'accessible_bathroom',
      'accessible_transportation',
      'service_animal_support',
      'accessible_parking',
      'medical_facilities_nearby'
    ],
    verifiedStatus: true,
    lastUpdated: 'August 2026 (Verified by SFMTA Accessibility)',
    aiSummary: 'San Francisco requires slope-aware pathfinding! Avoid Nob Hill and Russian Hill inclines; stick to the Embarcadero, Golden Gate Park, and Mission District for flat, fully ADA-accessible exploration.'
  }
];
