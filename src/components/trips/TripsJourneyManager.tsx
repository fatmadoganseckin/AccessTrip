import React, { useState } from 'react';
import {
  CalendarRange,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Hotel,
  Plane,
  Car,
  ShieldCheck,
  ArrowRight,
  Plus,
  Navigation,
  Sun,
  PhoneCall,
  RotateCcw,
  Star,
  ListTodo
} from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { useApp } from '../../context/AppContext';
import { SafeImage } from '../common/SafeImage';

export const TripsJourneyManager: React.FC = () => {
  const { setActiveTab } = useTrip();
  const { setActiveView } = useApp();
  const [showEmptyState, setShowEmptyState] = useState(false);

  if (showEmptyState) {
    return (
      <div className="py-16 text-center space-y-4 max-w-md mx-auto">
        <div className="w-16 h-16 rounded-3xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
          <CalendarRange className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">No trips yet</h2>
        <p className="text-xs text-slate-500 font-medium">
          Start planning your first accessible journey with verified stays and step-free routes.
        </p>
        <button
          onClick={() => setActiveView('ai_planner')}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all inline-flex items-center space-x-2"
        >
          <span>Plan a Trip</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <div className="pt-4">
          <button
            onClick={() => setShowEmptyState(false)}
            className="text-[11px] font-semibold text-slate-400 underline hover:text-slate-600"
          >
            Switch to populated demo mode
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 max-w-[1440px] mx-auto">
      
      {/* 1. Page Header & View Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight flex items-center">
            <CalendarRange className="w-6 h-6 text-emerald-600 mr-2.5" />
            <span>Journey Management — Active & Booked Trips</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Manage active travel itineraries, booking verifications, and real-time accessibility task lists.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveView('ai_planner')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-sm flex items-center space-x-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Plan New Trip</span>
          </button>
          <button
            onClick={() => setShowEmptyState(true)}
            className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 font-semibold text-xs rounded-xl border border-slate-200 dark:border-slate-700"
            title="Preview Empty State"
          >
            Demo Empty
          </button>
        </div>
      </div>

      {/* 2. CURRENT ACTIVE TRIP BANNER (If active today) */}
      <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl shadow-xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/80 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Active Trip — Day 3 of 7</span>
            </div>
            <h2 className="text-2xl font-black text-white">Barcelona Accessible Summer Retreat</h2>
            <p className="text-xs text-slate-300 font-medium mt-0.5">10–17 September 2026 • Stay: W Barcelona Accessible Suite</p>
          </div>

          <div className="flex items-center space-x-3 text-xs font-semibold">
            <span className="px-3 py-1.5 bg-slate-800/90 rounded-xl border border-slate-700 flex items-center">
              <Sun className="w-4 h-4 text-amber-400 mr-1.5" /> 24°C Clear
            </span>
            <span className="px-3 py-1.5 bg-red-950/80 text-red-200 rounded-xl border border-red-800 flex items-center">
              <PhoneCall className="w-4 h-4 text-red-400 mr-1.5" /> SOS Emergency: 112
            </span>
          </div>
        </div>

        {/* Active Trip Day 3 Live Itinerary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-700/80 space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-emerald-400">09:00 AM • Morning</span>
            <div className="font-bold text-xs text-white">Step-free roll-in breakfast at Hotel Terrace</div>
            <p className="text-[11px] text-slate-300">Ramp entrance verified with elevator to level 2 dining.</p>
          </div>

          <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-700/80 space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-emerald-400">11:30 AM • Afternoon</span>
            <div className="font-bold text-xs text-white">Sagrada Família Accessible Priority Entry</div>
            <p className="text-[11px] text-slate-300">Priority elevator reserved; step-free audio guide collected.</p>
          </div>

          <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-700/80 space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-emerald-400">03:00 PM • Evening</span>
            <div className="font-bold text-xs text-white">Nova Icaria Wheelchair Beach Boardwalk</div>
            <p className="text-[11px] text-slate-300">Accessible wooden ramp & amphibious sea chair reserved.</p>
          </div>
        </div>

        {/* Live Accessibility Alert */}
        <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-800/60 text-xs text-amber-200 font-semibold flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>Real-time Transit Alert: Subway L3 elevator maintenance at Liceu station until 18:00. Step-free detour via Bus V15 recommended.</span>
        </div>
      </div>

      {/* 3. UPCOMING TRIPS TIMELINE CARDS */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Upcoming Journeys (2)
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Card 1: Barcelona Trip */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all space-y-5">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold text-[10px] rounded-md uppercase">
                    Confirmed Booking
                  </span>
                  <span className="text-xs font-bold text-slate-500">10–17 Sept 2026</span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">Barcelona, Spain</h3>
                <p className="text-xs text-slate-500 font-medium">7 Nights • W Barcelona Accessible Suite</p>
              </div>

              <SafeImage
                src="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=300&q=80"
                alt="Barcelona"
                category="destination"
                className="w-20 h-20 rounded-2xl object-cover"
                containerClassName="w-20 h-20 rounded-2xl flex-shrink-0"
              />
            </div>

            {/* Verification Checklist Badges */}
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl flex items-center space-x-2 border border-slate-100 dark:border-slate-800">
                <Hotel className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="truncate">✓ Hotel Suite Confirmed</span>
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl flex items-center space-x-2 border border-slate-100 dark:border-slate-800">
                <Plane className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="truncate">✓ Accessible Seat 14A</span>
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl flex items-center space-x-2 border border-slate-100 dark:border-slate-800">
                <Car className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="truncate">✓ Ramp Airport Transfer</span>
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl flex items-center space-x-2 border border-slate-100 dark:border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="truncate">✓ Step-Free Plan Verified</span>
              </div>
            </div>

            {/* Stepper Status Line */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Journey Preparation Stepper</span>
              <div className="grid grid-cols-4 gap-1 text-[10px] text-center font-bold">
                <div className="p-1 bg-emerald-600 text-white rounded">Booked ✓</div>
                <div className="p-1 bg-emerald-600 text-white rounded">Verified ✓</div>
                <div className="p-1 bg-emerald-600 text-white rounded">Hotel Confirmed ✓</div>
                <div className="p-1 bg-emerald-600 text-white rounded">Transport Set ✓</div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('assistant')}
              className="w-full py-2.5 bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl transition-all flex items-center justify-center space-x-1.5"
            >
              <span>Open Trip Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Vancouver Trip */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all space-y-5">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-extrabold text-[10px] rounded-md uppercase">
                    Verification Pending
                  </span>
                  <span className="text-xs font-bold text-slate-500">14–21 Oct 2026</span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">Vancouver, Canada</h3>
                <p className="text-xs text-slate-500 font-medium">7 Nights • Fairmont Pacific Rim Accessible Suite</p>
              </div>

              <SafeImage
                src="https://images.unsplash.com/photo-1559511260-66a654ae982a?auto=format&fit=crop&w=300&q=80"
                alt="Vancouver"
                category="destination"
                className="w-20 h-20 rounded-2xl object-cover"
                containerClassName="w-20 h-20 rounded-2xl flex-shrink-0"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl flex items-center space-x-2 border border-slate-100 dark:border-slate-800">
                <Hotel className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="truncate">✓ Hotel Suite Reserved</span>
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl flex items-center space-x-2 border border-slate-100 dark:border-slate-800">
                <Plane className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span className="truncate">⌛ Flight Assistance Requested</span>
              </div>
            </div>

            {/* Stepper Status Line */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Journey Preparation Stepper</span>
              <div className="grid grid-cols-4 gap-1 text-[10px] text-center font-bold">
                <div className="p-1 bg-emerald-600 text-white rounded">Booked ✓</div>
                <div className="p-1 bg-amber-500 text-white rounded">Verifying...</div>
                <div className="p-1 bg-slate-200 dark:bg-slate-800 text-slate-500 rounded">Pending</div>
                <div className="p-1 bg-slate-200 dark:bg-slate-800 text-slate-500 rounded">Pending</div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('assistant')}
              className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-extrabold text-xs rounded-xl transition-all flex items-center justify-center space-x-1.5"
            >
              <span>Manage Trip</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* 4. UPCOMING ACCESSIBILITY TASKS */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center">
            <ListTodo className="w-4 h-4 text-emerald-600 mr-2" /> Upcoming Accessibility Action Items
          </h2>
          <span className="px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold text-[10px] rounded-full">
            4 Actionable Items
          </span>
        </div>

        <div className="space-y-2.5 text-xs font-semibold">
          {[
            { title: 'Hotel roll-in shower door width confirmation', status: 'In Review with Host', priority: 'High' },
            { title: 'Airport electric wheelchair gate transfer request', status: 'Submitted to Airline', priority: 'Medium' },
            { title: 'Vancouver power wheelchair charger voltage adapter', status: 'Pending', priority: 'Low' },
            { title: 'Accessible travel mobility insurance claim verification', status: 'Verified ✓', priority: 'Done' }
          ].map((task, idx) => (
            <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked={task.priority === 'Done'} className="w-4 h-4 rounded text-emerald-600" />
                <span className={`text-slate-800 dark:text-slate-200 ${task.priority === 'Done' ? 'line-through text-slate-400' : ''}`}>
                  {task.title}
                </span>
              </div>
              <span className="text-[10px] font-extrabold px-2 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-slate-700 dark:text-slate-300">
                {task.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. PAST TRIPS */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Past Journeys (1)
        </h2>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center space-x-4">
            <SafeImage
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&q=80"
              alt="Lisbon"
              category="destination"
              className="w-14 h-14 rounded-2xl object-cover"
              containerClassName="w-14 h-14 rounded-2xl flex-shrink-0"
            />
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Visited Sept 2025</span>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">Lisbon Historic Coast Tour</h3>
              <p className="text-xs text-slate-500">7 Days • 100% Barrier-free tram route completed</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl flex items-center space-x-1">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Rate Experience</span>
            </button>
            <button className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 font-bold text-xs rounded-xl flex items-center space-x-1">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reuse Itinerary</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
