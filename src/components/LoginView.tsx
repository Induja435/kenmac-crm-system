/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Rocket, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: (email: string) => void;
}

export default function LoginView({ onLoginSuccess }: LoginViewProps) {
  const [email, setEmail] = useState('partner@horizoncloud.com');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    // Simulate authenticating against the Horizon Enterprise CRM backend
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(email);
    }, 1200);
  };

  return (
    <div className="bg-mesh min-h-screen w-full flex items-center justify-center p-4 relative font-sans select-none overflow-x-hidden">
      {/* Background Decorative Blob Elements */}
      <div className="fixed top-0 right-0 w-1/3 h-screen -z-10 overflow-hidden hidden lg:block">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[80px]" />
      </div>

      <motion.main
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-[440px] flex flex-col pt-4 pb-12"
      >
        {/* Logo and Header Details */}
        <div className="mb-8 text-center">
          <h1 className="font-sans text-3xl font-bold tracking-tight text-slate-950">
            KENMAC PORTAL
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1.5">
            Enterprise IT Consultancy Hub
          </p>
        </div>

        {/* Major Login Card Container */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input Field */}
              <div className="space-y-1.5">
                <label className="text-center font-headline text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block text-left">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
                    <Mail className="w-5 h-5 transition-colors duration-200" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    required
                    className="w-full pl-11 pr-4 py-2.5 bg-surface-container-low border border-outline-variant rounded text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-sans text-sm"
                  />
                </div>
              </div>

              {/* Password Input Field */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-end">
                  <label className="font-headline text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block text-left">
                    Password
                  </label>
                  <a
                    href="#forgot"
                    onClick={(e) => { e.preventDefault(); alert('To reset password, please reach out directly to your network systems administrator.'); }}
                    className="text-xs font-semibold text-secondary hover:underline transition-colors"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
                    <Lock className="w-5 h-5 transition-colors duration-200" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-11 pr-11 py-2.5 bg-surface-container-low border border-outline-variant rounded text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-sans text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-outline hover:text-on-surface transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Keep Me Signed In Tickbox */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary focus:ring-offset-0 bg-surface cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2.5 text-xs font-medium text-on-surface-variant select-none cursor-pointer">
                  Keep me signed in for 30 days
                </label>
              </div>

              {errorMessage && (
                <div className="text-xs text-error font-medium bg-error-container/20 p-2.5 rounded border border-error-container/30">
                  {errorMessage}
                </div>
              )}

              {/* Submit Active Authentication Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 bg-primary text-white font-headline text-[15px] font-bold py-3 rounded hover:bg-primary-container active:scale-[0.98] transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-75 disabled:pointer-events-none group cursor-pointer"
              >
                <span>{isLoading ? 'Authenticating CRM Partner...' : 'Sign In'}</span>
                {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>

            {/* SSO Separation Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-surface-container-lowest text-[10px] font-bold text-outline uppercase tracking-widest bg-white">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Single Sign-on Grid Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => onLoginSuccess('google.user@kinetictech.io')}
                className="flex items-center justify-center gap-2 px-4 py-2.5 border border-outline-variant rounded bg-surface hover:bg-surface-container-low transition-all duration-150 group cursor-pointer text-xs font-semibold"
              >
                <img
                  alt="Google Icon"
                  className="w-4 h-4 grayscale group-hover:grayscale-0 transition-all"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5KfgoLAercZlENpyS6h1PQL8rfKenruBoXPYRH0Bx9VbEoaO1ZMDz03qpa6vHLsjO_Yt3D5RBNmuadnqy6vvxiXRUhViOrz7lS1kQ3XtXZDoUfbX1-7EnUzj7-Baxd1REGAYG9UDAEHk-zSGPGtj0LVhfTlYXRwfvTKqREppXCyF9Kssho1OMnKQ-lMupAB2mTZQ6-Eh27-md_42FNL9NtYtLE94JxBLLOHPWjkTKd9V0PmtrYrXNZ2C43L9a2nzD9bgICoQaEkwO"
                />
                <span className="text-on-surface">Google</span>
              </button>
              <button
                type="button"
                onClick={() => onLoginSuccess('azure.user@kinetictech.io')}
                className="flex items-center justify-center gap-2 px-4 py-2.5 border border-outline-variant rounded bg-surface hover:bg-surface-container-low transition-all duration-150 group cursor-pointer text-xs font-semibold"
              >
                <div className="w-4 h-4 flex items-center justify-center text-outline group-hover:text-[#0078d4] transition-colors">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 23 23">
                    <rect x="0" y="0" width="10.5" height="10.5" fill="#f25022" />
                    <rect x="12.5" y="0" width="10.5" height="10.5" fill="#7fba00" />
                    <rect x="0" y="12.5" width="10.5" height="10.5" fill="#00a4ef" />
                    <rect x="12.5" y="12.5" width="10.5" height="10.5" fill="#ffb900" />
                  </svg>
                </div>
                <span className="text-on-surface">Azure AD</span>
              </button>
            </div>
          </div>

          {/* Card Verification Help Footer */}
          <div className="px-8 py-4 bg-surface-container border-t border-outline-variant text-center">
            <p className="text-xs text-on-surface-variant font-medium">
              Don't have an enterprise account?{' '}
              <a
                href="#admin"
                onClick={(e) => { e.preventDefault(); alert('Please send an authorization email request to system-admin@kinetictech.io with your corporate credentials.'); }}
                className="text-secondary font-bold hover:underline transition-all"
              >
                Contact Administrator
              </a>
            </p>
          </div>
        </div>

        {/* Footer Policy and Copyright Links */}
        <footer className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-bold text-on-surface-variant/75 text-center sm:text-left">
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
          <p>© {new Date().getFullYear()} Kenmac Enterprise. All rights reserved.</p>
        </footer>
      </motion.main>
    </div>
  );
}
