import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { Lock, KeyRound, User, Eye, EyeOff, X, ShieldCheck, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';

export const AdminAuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, loginAdmin } = useCMS();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const success = loginAdmin(username.trim(), password);
      setIsLoading(false);

      if (success) {
        setUsername('');
        setPassword('');
        setError(null);
        const path = window.location.pathname.toLowerCase().replace(/\/+$/, '');
        if (path === '/admin' || window.location.hash.toLowerCase() === '#admin') {
          window.history.replaceState({}, '', '/');
        }
      } else {
        setError('Invalid username or password. Access restricted to administrator.');
      }
    }, 400);
  };

  const handleClose = () => {
    setIsAuthModalOpen(false);
    setError(null);
    const path = window.location.pathname.toLowerCase().replace(/\/+$/, '');
    if (path === '/admin' || window.location.hash.toLowerCase() === '#admin') {
      window.history.replaceState({}, '', '/');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Background with Gradient Aura */}
        <div className="relative bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950 px-6 pt-8 pb-7 text-white overflow-hidden border-b border-stone-800">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3.5 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-400 p-0.5 shadow-lg shadow-amber-500/30">
              <div className="w-full h-full bg-stone-950 rounded-[14px] flex items-center justify-center">
                <Lock className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-amber-300 uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Admin Gateway</span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">Portfolio Settings</h3>
            </div>
          </div>
          <p className="text-xs text-stone-300 mt-1 leading-relaxed">
            Please enter your administrator credentials to access the portfolio editor and settings.
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-7 bg-slate-900">
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-950/80 border border-red-500/40 flex items-start gap-2.5 text-xs font-medium text-red-300 animate-in shake duration-200">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="leading-snug">{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Admin Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Enter admin username"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-stone-950/90 border border-stone-800 rounded-xl text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all font-medium"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">
                Admin Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-stone-950/90 border border-stone-800 rounded-xl text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-200 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-sm shadow-lg shadow-amber-600/25 active:scale-98 transition-all disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <span>Verifying Access...</span>
              ) : (
                <>
                  <span>Sign In as Admin</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
