/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building, Mail, Phone, Clock, Send, CheckCircle2, 
  MapPin, HelpCircle, Loader2, Globe, Sparkles 
} from 'lucide-react';
import { Inquiry } from '../types';

export default function ContactView() {
  const [fullName, setFullName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [company, setCompany] = useState('');
  const [serviceInterest, setServiceInterest] = useState('Cloud & Infrastructure');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !businessEmail || !message) {
      setErrorMessage('Please fill in Name, Business Email, and Message detail prompts.');
      return;
    }

    // Quick regex email validator
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(businessEmail)) {
      setErrorMessage('Please enter a standard organizational email address.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    // Simulate sending organizational broadcast to kinetic sys-admins
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      
      // Reset variables
      setFullName('');
      setBusinessEmail('');
      setCompany('');
      setServiceInterest('Cloud & Infrastructure');
      setMessage('');
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      
      {/* Header sections */}
      <div className="text-left">
        <h2 className="font-headline text-2xl font-bold text-primary tracking-tight">Kenmac Partner Terminal</h2>
        <p className="text-sm font-medium text-on-surface-variant">Command dispatcher for corporate requests, pilot evaluations, and contract escalations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Active Corporate Office Nodes Details (Takes 1 Col) */}
        <div className="space-y-6">
          
          {/* Node 1: NYC Headquarter Sapps */}
          <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl shadow-sm text-left space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                <Building className="w-5 h-5 bg-[#001735]/0" />
              </div>
              <div>
                <h3 className="font-headline text-sm font-bold text-primary">HQ - North America Gate</h3>
                <span className="text-[10px] text-secondary font-bold uppercase tracking-wider">Financial Hub Division</span>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-outline-variant text-xs text-on-surface-variant font-medium">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-outline shrink-0 mt-0.5" />
                <span>60 Wall Street, 21st Floor<br />New York City, NY 10005</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-outline shrink-0" />
                <span>+1 (212) 555-0190</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-outline shrink-0" />
                <span>dispatch@kenmac.io</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-outline shrink-0" />
                <span>08:30 - 18:00 EST | Mon-Fri</span>
              </div>
            </div>
          </div>

          {/* Node 2: London Gate */}
          <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl shadow-sm text-left space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-700">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-headline text-sm font-bold text-primary">Gate - London Heathrow</h3>
                <span className="text-[10px] text-orange-700 font-bold uppercase tracking-wider">EMEA Operational Gateway</span>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-outline-variant text-xs text-on-surface-variant font-medium">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-outline shrink-0 mt-0.5" />
                <span>30 St Mary Axe (The Gherkin)<br />London, EC3A 8BF, United Kingdom</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-outline shrink-0" />
                <span>+44 20 7946 0852</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-outline shrink-0" />
                <span>emea-gateway@kinetictech.io</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-outline shrink-0" />
                <span>09:00 - 17:30 GMT | Mon-Fri</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: High Fidelity interactive Inquiry Dispatch Form (Takes 2 Cols) */}
        <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm flex flex-col justify-between overflow-hidden">
          
          <div className="p-6 border-b border-outline-variant flex items-center justify-between bg-surface-container/30">
            <div className="flex items-center gap-2 text-primary text-left">
              <Send className="w-5 h-5 text-secondary" />
              <div>
                <h3 className="font-headline font-bold text-base">Dispatch Organizational Inquiry</h3>
                <p className="text-[11px] text-on-surface-variant font-medium mt-0.5">Corporate routing nodes will redirect tickets within 2 business hours.</p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 bg-[#d6e3ff] text-[#001c3c] text-[10px] font-mono font-bold px-2 py-1 rounded">
              <Sparkles className="w-3 h-3 text-secondary" />
              <span>SSL SECURE</span>
            </span>
          </div>

          <form onSubmit={handleInquirySubmit} className="p-6 space-y-4 text-left">
            
            {/* Grid Double Row: Name & Business Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                  Author Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Elizabeth Swan"
                  className="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant rounded text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </div>

              {/* Business Email */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                  Corporate Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={businessEmail}
                  onChange={(e) => setBusinessEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant rounded text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            {/* Grid Double Row: Company & Service Interest */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Company Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                  Entity / Company Name
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Starling Logistics Co"
                  className="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant rounded text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Service interest */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                  Primary Specialization of Interest
                </label>
                <select
                  value={serviceInterest}
                  onChange={(e) => setServiceInterest(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant rounded text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="Cloud & Infrastructure">Cloud Infrastructure Migration</option>
                  <option value="AI/ML Initiatives">AI & Large Language Modeling Initiatives</option>
                  <option value="Cybersecurity">Application & Firewall Penetration Audit</option>
                  <option value="Data Analytics">Unified Omni-Lakehouses & Data Science</option>
                </select>
              </div>
            </div>

            {/* MESSAGE BODY */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                Detailed SOW Request or Incident Description <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Details of milestones, timeframe deliverables, or compliance requirements..."
                className="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant rounded text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none"
              />
            </div>

            {errorMessage && (
              <div className="text-xs text-error font-medium bg-error-container/20 p-2.5 rounded border border-error-container/30">
                {errorMessage}
              </div>
            )}

            <AnimatePresence>
              {success && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-secondary-container text-on-secondary-container p-3 rounded text-center font-bold text-xs flex items-center justify-center gap-2 border border-secondary/35"
                >
                  <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                  <span>✓ Inquiry successfully broadcasted. Secure token dispatched to email address.</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-3.5 border-t border-outline-variant/60 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-primary hover:bg-primary-container text-white font-headline text-xs font-bold rounded flex items-center justify-center gap-2 cursor-pointer transition-colors shadowactive:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting payload...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Dispatch Payload Ticket</span>
                  </>
                )}
              </button>
            </div>

          </form>

        </div>

      </div>

    </div>
  );
}
