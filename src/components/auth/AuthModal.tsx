import React, { useState } from 'react';
import { X, LogIn, Mail, ShieldCheck, UserCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, user, loginWithGoogle, loginWithEmail, loginWithSupabase, logout } = useAuth();
  const [emailInput, setEmailInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setIsSubmitting(true);
    await loginWithEmail(emailInput);
    setIsSubmitting(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-brand-600 dark:text-brand-400">
            <LogIn className="w-7 h-7" />
            <h2 id="auth-modal-title" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {user ? 'Account Settings' : 'Sign In to AccessTrip'}
            </h2>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-xl"
            aria-label="Close sign in modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {user ? (
          /* Active User Profile View */
          <div className="space-y-6 text-center">
            <div className="flex flex-col items-center justify-center space-y-3">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-20 h-20 rounded-2xl border-4 border-brand-500 shadow-md object-cover"
              />
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">{user.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{user.email}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-xs rounded-full border border-emerald-300 dark:border-emerald-800">
                  ✓ Authenticated via {user.provider.toUpperCase()}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                logout();
                closeAuthModal();
              }}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl focus:outline-none focus:ring-4 focus:ring-red-400 shadow-md"
            >
              Sign Out Account
            </button>
          </div>
        ) : (
          /* Auth Provider Options */
          <div className="space-y-4">
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
              Sync your personalized accessibility profile, save custom itineraries, and submit ground-truth reviews.
            </p>

            {/* Google OAuth */}
            <button
              onClick={loginWithGoogle}
              className="w-full py-3.5 px-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-bold rounded-2xl border border-slate-300 dark:border-slate-700 shadow-sm flex items-center justify-center space-x-3 focus:outline-none focus:ring-4 focus:ring-brand-400 transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Supabase Auth */}
            <button
              onClick={loginWithSupabase}
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md flex items-center justify-center space-x-3 focus:outline-none focus:ring-4 focus:ring-emerald-400 transition-all"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Continue with Supabase Auth</span>
            </button>

            <div className="relative my-4 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
              </div>
              <span className="relative px-3 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-400">
                Or sign in with email
              </span>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-400 shadow-md flex items-center justify-center space-x-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>{isSubmitting ? 'Signing In...' : 'Send Magic Link / Passkey'}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
