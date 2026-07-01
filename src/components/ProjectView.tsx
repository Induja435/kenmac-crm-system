/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Calendar, DollarSign, Loader2, Star, Check, 
  MapPin, Shield, Brain, Globe, Database, Network, 
  MessageSquare, ChevronRight, FileCode, Paperclip, Download, Mail, Phone, ExternalLink 
} from 'lucide-react';
import { Project, Consultant } from '../types';

interface ProjectViewProps {
  projects: Project[];
  consultants: Consultant[];
  selectedProjectId: string | null;
  onSelectProject: (id: string | null) => void;
  onNavigateToView: (view: string) => void;
}

export default function ProjectView({
  projects,
  consultants,
  selectedProjectId,
  onSelectProject,
  onNavigateToView
}: ProjectViewProps) {
  // Local state for searching & filtering project grids
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Cloud & Infrastructure' | 'AI/ML Initiatives' | 'Cybersecurity' | 'Data Analytics'>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'On Track' | 'At Risk' | 'Active' | 'Planned'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Consultant contact modal inside details
  const [isContacting, setIsContacting] = useState(false);
  const [contactSubject, setContactSubject] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  // Find currently open project
  const currentProject = projects.find(p => p.id === selectedProjectId);

  // Filter projects catalog
  const filteredProjects = projects.filter(p => {
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.leadConsultantName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  // Find connected consultant profile
  const leadConsultant = consultants.find(c => c.name === currentProject?.leadConsultantName);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsContacting(true);
    setTimeout(() => {
      setIsContacting(false);
      setContactSuccess(true);
      setContactSubject('');
      setContactMsg('');
      setTimeout(() => setContactSuccess(false), 3000);
    }, 1000);
  };

  // Helper to render customized illustration panels
  const renderIllustration = (type: 'globe' | 'ai' | 'shield' | 'database' | 'iot') => {
    switch(type) {
      case 'globe':
        return (
          <div className="w-full h-32 bg-primary-container relative rounded-lg flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#0b1c30]/40" />
            <Globe className="w-14 h-14 text-secondary animate-spin-slow opacity-90" style={{ animationDuration: '25s' }} />
            <div className="absolute top-2 left-2 flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
              <span className="text-[10px] text-white/80 font-mono">EMEA GATEWAY</span>
            </div>
          </div>
        );
      case 'ai':
        return (
          <div className="w-full h-32 bg-teal-950 relative rounded-lg flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#00201d]/50" />
            <Brain className="w-14 h-14 text-secondary-fixed animate-pulse opacity-90" />
            <div className="absolute top-2 left-2 flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-secondary animate-ping" />
              <span className="text-[10px] text-white/80 font-mono">NEURAL COGNITION</span>
            </div>
          </div>
        );
      case 'shield':
        return (
          <div className="w-full h-32 bg-red-950/20 border border-red-500/10 relative rounded-lg flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-red-950/30" />
            <Shield className="w-14 h-14 text-red-400 opacity-90" />
            <div className="absolute top-2 left-2 flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-[10px] text-red-400 font-mono">FIREWALL OVERWATCH</span>
            </div>
          </div>
        );
      case 'database':
        return (
          <div className="w-full h-32 bg-slate-900 relative rounded-lg flex items-center justify-center overflow-hidden">
            <Database className="w-14 h-14 text-blue-400 opacity-95" />
            <div className="absolute top-2 left-2 flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
              <span className="text-[10px] text-white/85 font-mono">DATA STREAMS ACTIVE</span>
            </div>
          </div>
        );
      case 'iot':
        return (
          <div className="w-full h-32 bg-[#1d2123] relative rounded-lg flex items-center justify-center overflow-hidden">
            <Network className="w-14 h-14 text-purple-400 opacity-90 animate-pulse" />
            <div className="absolute top-2 left-2 flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
              <span className="text-[10px] text-white/80 font-mono">MESH GRID LIVE</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="font-sans">
      <AnimatePresence mode="wait">
        
        {/* VIEW MODE 1: PROJECT DETAILS VIEW */}
        {currentProject ? (
          <motion.div
            key="details-view"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Header / Navigate bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <button
                onClick={() => onSelectProject(null)}
                className="flex items-center gap-2 text-primary hover:text-secondary font-headline text-sm font-bold cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Initiatives Grid</span>
              </button>
              <div className="text-xs text-on-surface-variant font-semibold bg-surface-container border border-outline-variant px-3 py-1.5 rounded-full inline-block">
                Initiative ID: <span className="font-mono font-bold text-primary">{currentProject.id}</span>
              </div>
            </div>

            {/* Core Info Split Structure */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column: Scope summary stats, timelines & attachments */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Main Scope Info */}
                <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-3 py-1 bg-primary-fixed text-[#122e54] font-headline text-xs font-bold rounded-full">
                      {currentProject.category}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      currentProject.status === 'On Track' 
                        ? 'bg-secondary-container text-on-secondary-container' 
                        : currentProject.status === 'At Risk' 
                        ? 'bg-red-150 text-red-800' 
                        : 'bg-blue-105 text-blue-800'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${currentProject.status === 'On Track' ? 'bg-secondary' : 'bg-red-500'}`} />
                      <span>{currentProject.status}</span>
                    </span>
                  </div>

                  <div>
                    <h2 className="font-headline text-2xl font-bold text-primary tracking-tight">{currentProject.name}</h2>
                    <p className="text-sm font-medium text-on-surface-variant mt-2.5 leading-relaxed">{currentProject.description}</p>
                  </div>

                  {/* SOW graphic visuals */}
                  {renderIllustration(currentProject.illustrationType)}

                  {/* Progressive Meter */}
                  <div className="pt-2">
                    <div className="flex justify-between text-xs font-bold text-primary mb-2">
                      <span>Milestones Progress</span>
                      <span className="font-mono">{currentProject.overallProgress}% Complete</span>
                    </div>
                    <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                      <div className="bg-secondary h-full rounded-full transition-all duration-500" style={{ width: `${currentProject.overallProgress}%` }} />
                    </div>
                  </div>

                  {/* Dates & Financial figures */}
                  <div className="grid grid-cols-3 gap-4 pt-3.5 border-t border-outline-variant/60">
                    <div>
                      <span className="text-[10px] font-bold text-outline uppercase tracking-wider block">Est. Commencement</span>
                      <span className="text-xs font-bold text-primary mt-1 block">{currentProject.startDate}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-outline uppercase tracking-wider block">Final Delivery</span>
                      <span className="text-xs font-bold text-primary mt-1 block">{currentProject.endDate}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-outline uppercase tracking-wider block">Capital Expended</span>
                      <span className="text-xs font-extrabold text-secondary mt-1 block">
                        ${currentProject.spentToDate.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Milestones timeline catalog */}
                <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm">
                  <h3 className="font-headline text-base font-bold text-primary mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-secondary" />
                    <span>Development Milestones Timeline</span>
                  </h3>
                  
                  <div className="relative border-l border-outline-variant ml-3 pl-6 space-y-6">
                    {currentProject.milestones?.map((mil, idx) => (
                      <div key={mil.id} className="relative">
                        {/* Bullet point node */}
                        <span className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center ${
                          mil.status === 'Completed' 
                            ? 'bg-secondary text-white' 
                            : mil.status === 'In Progress' 
                            ? 'bg-orange-500 text-white' 
                            : 'bg-outline text-white'
                        }`}>
                          {mil.status === 'Completed' && <Check className="w-2.5 h-2.5" />}
                        </span>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-xs font-bold text-primary font-headline">{mil.title}</span>
                            <span className="text-[10px] font-mono font-bold text-on-surface-variant bg-surface-container px-2 py-0.5 rounded">
                              {mil.date}
                            </span>
                          </div>
                          <p className="text-xs text-on-surface-variant font-medium mt-1 leading-relaxed">{mil.description}</p>
                        </div>
                      </div>
                    )) || (
                      <div className="text-xs text-center font-medium text-on-surface-variant py-4">
                        Standard Agile tracking template loads during deep active sprints.
                      </div>
                    )}
                  </div>
                </div>

                {/* SOW & Attachments downloads */}
                <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm">
                  <h3 className="font-headline text-base font-bold text-primary mb-2 flex items-center gap-2">
                    <Paperclip className="w-5 h-5 text-primary" />
                    <span>Associated Documents & Deliverables</span>
                  </h3>
                  <p className="text-xs text-on-surface-variant font-medium mb-4">Click below to fetch certified PDF transcripts or wireframes.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentProject.documents?.map((doc) => (
                      <div 
                        key={doc.id}
                        onClick={() => alert(`Initiating secure SSL retrieval file pipeline for document code "${doc.id}"`)}
                        className="p-3 border border-outline-variant/75 rounded flex items-center justify-between hover:border-primary/50 hover:bg-surface-container-low cursor-pointer transition-colors group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-9 h-9 bg-surface-container border border-outline-variant rounded flex items-center justify-center text-primary">
                            <FileCode className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-primary truncate">{doc.title}</div>
                            <div className="text-[10px] text-on-surface-variant font-medium uppercase mt-0.5 font-mono">{doc.type}</div>
                          </div>
                        </div>

                        <span className="text-outline hover:text-primary transition-colors p-1.5 rounded hover:bg-surface group-hover:scale-105">
                          <Download className="w-4 h-4" />
                        </span>
                      </div>
                    )) || (
                      <div className="col-span-2 p-3 border border-dashed border-outline-variant rounded text-center text-xs font-semibold text-on-surface-variant">
                        No general SOW attachments mapped yet for this initiative.
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Right Column: Lead architect dashboard card & active contacting form */}
              <div className="space-y-6">
                
                {/* Lead architect card */}
                {leadConsultant && (
                  <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden flex flex-col">
                    <div className="bg-primary p-6 text-white text-center flex flex-col items-center relative">
                      {/* Status indicator pill */}
                      <span className="absolute top-4 right-4 text-[10px] font-bold bg-[#86f2e4] text-[#00201d] px-2 py-0.5 rounded">
                        {leadConsultant.status}
                      </span>

                      <img
                        src={leadConsultant.avatar}
                        alt={leadConsultant.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-full object-cover border-2 border-secondary shadow"
                      />
                      <h4 className="font-headline text-lg font-bold mt-3">{leadConsultant.name}</h4>
                      <p className="text-xs text-primary-fixed-dim font-medium mt-0.5">{leadConsultant.role}</p>

                      <div className="flex items-center gap-1 mt-2 bg-white/10 px-2.5 py-1 rounded text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-current text-amber-300" />
                        <span>{leadConsultant.rating} rating</span>
                        <span className="opacity-60">({leadConsultant.reviews} audits)</span>
                      </div>
                    </div>

                    <div className="p-5 space-y-4">
                      <div>
                        <span className="text-[10px] text-outline uppercase font-bold tracking-wider block mb-2 text-left">Consultant Stack Tools</span>
                        <div className="flex flex-wrap gap-1.5">
                          {leadConsultant.skills.map(s => (
                            <span key={s} className="text-[10px] font-mono font-bold bg-surface-container text-primary px-2 py-1 rounded">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Working contact form inputs */}
                      <div className="pt-4 border-t border-outline-variant/60">
                        <span className="text-[10px] text-outline uppercase font-bold tracking-wider block mb-3 text-left">Direct Message Architect</span>
                        
                        <form onSubmit={handleContactSubmit} className="space-y-3">
                          <input
                            type="text"
                            required
                            placeholder="Message Subject..."
                            value={contactSubject}
                            onChange={(e) => setContactSubject(e.target.value)}
                            className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                          />
                          <textarea
                            required
                            rows={3}
                            placeholder="Type inquiry detailing sprint milestones..."
                            value={contactMsg}
                            onChange={(e) => setContactMsg(e.target.value)}
                            className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none"
                          />
                          
                          {contactSuccess && (
                            <div className="text-[11px] text-on-secondary-container bg-secondary-container p-2 rounded text-center font-bold">
                              ✓ Broadcast request relayed successfully!
                            </div>
                          )}

                          <button
                            type="submit"
                            disabled={isContacting}
                            className="w-full py-2 bg-secondary hover:bg-secondary-fixed text-on-secondary-fixed font-headline text-xs font-bold rounded flex items-center justify-center gap-2 cursor-pointer transition-colors active:scale-95 disabled:opacity-50"
                          >
                            {isContacting ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span>Relaying Message...</span>
                              </>
                            ) : (
                              <>
                                <Mail className="w-3.5 h-3.5" />
                                <span>Send Internal Message</span>
                              </>
                            )}
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                )}

                {/* Customer Support Panel */}
                <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl shadow-sm text-left">
                  <h4 className="font-headline text-sm font-bold text-primary mb-2">Escalate SOW Requirements?</h4>
                  <p className="text-xs text-on-surface-variant font-medium leading-relaxed mb-4">
                    If you require major contractual amendments, budget expansion proposals, or urgent milestone updates.
                  </p>
                  <button
                    onClick={() => onNavigateToView('contact')}
                    className="w-full py-2 border border-outline text-primary hover:bg-surface-container font-headline text-xs font-bold rounded transition-colors text-center cursor-pointer"
                  >
                    Contact Partner Relations
                  </button>
                </div>

              </div>

            </div>
          </motion.div>
        ) : (
          
          /* VIEW MODE 2: PROJECTS CATALOG LIST VIEW */
          <motion.div
            key="catalog-view"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Top Toolbar list */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="font-headline text-2xl font-bold text-primary tracking-tight">Enterprise IT Initiatives</h2>
                <p className="text-sm font-medium text-on-surface-variant">Consolidated active project charters & resource assignment map.</p>
              </div>

              {/* Quick Search */}
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter initiative description..."
                  className="pl-9 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary w-64 shadow-sm"
                />
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
              </div>
            </div>

            {/* Filter Pills list */}
            <div className="flex flex-wrap gap-2 items-center justify-between bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/60">
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="text-[10px] text-outline uppercase font-bold tracking-wider mr-2 hidden sm:block">Sector Domain:</span>
                {(['All', 'Cloud & Infrastructure', 'AI/ML Initiatives', 'Cybersecurity', 'Data Analytics'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-3 py-1 bg-[#1c1212]/0 text-xs font-bold rounded cursor-pointer transition-colors ${
                      categoryFilter === cat 
                        ? 'bg-primary text-white shadow-sm' 
                        : 'text-on-surface-variant hover:bg-surface-container'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="text-[11px] text-outline font-mono font-bold">
                {filteredProjects.length} Initiatives registered
              </div>
            </div>

            {/* Grid of Initiatives */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((proj) => (
                <motion.div
                  key={proj.id}
                  whileHover={{ y: -3 }}
                  className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden flex flex-col justify-between"
                >
                  <div className="p-5 space-y-4">
                    {/* Top row category & status */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-bold text-on-surface-variant bg-surface-container px-2 py-0.5 rounded uppercase">
                        {proj.id}
                      </span>
                      <span className={`inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-[10px] font-bold ${
                        proj.status === 'On Track' 
                          ? 'bg-secondary-container text-on-secondary-container' 
                          : proj.status === 'At Risk' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        <span className={`w-1 h-1 rounded-full ${proj.status === 'On Track' ? 'bg-secondary' : 'bg-red-500'}`} />
                        <span>{proj.status}</span>
                      </span>
                    </div>

                    {/* Project text */}
                    <div>
                      <h3 className="font-headline text-base font-bold text-primary group-hover:text-secondary truncate">
                        {proj.name}
                      </h3>
                      <p className="text-xs text-on-surface-variant font-medium mt-1.5 leading-relaxed line-clamp-3">
                        {proj.description}
                      </p>
                    </div>

                    {/* ProgressBar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px] font-bold text-primary">
                        <span>Milestone Progress</span>
                        <span className="font-mono">{proj.overallProgress}%</span>
                      </div>
                      <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                        <div className="bg-secondary h-full rounded-full" style={{ width: `${proj.overallProgress}%` }} />
                      </div>
                    </div>
                  </div>

                  {/* Footing detail segment */}
                  <div className="px-5 py-3.5 bg-surface-container border-t border-outline-variant/60 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={proj.leadConsultantImg}
                        alt={proj.leadConsultantName}
                        referrerPolicy="no-referrer"
                        className="w-7 h-7 rounded-full object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-[10px] text-outline uppercase font-bold tracking-wider">Lead Partner</div>
                        <div className="text-xs font-bold text-primary truncate">{proj.leadConsultantName}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectProject(proj.id)}
                      className="px-3 py-1.5 bg-primary text-white font-headline text-xs font-bold rounded hover:bg-primary-container flex items-center gap-1 transition-colors cursor-pointer group shrink-0"
                    >
                      <span>Partner SOW</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}

              {filteredProjects.length === 0 && (
                <div className="col-span-full py-12 text-center text-sm font-medium text-on-surface-variant max-w-md mx-auto">
                  No active projects match the selected domain or filter queries. Clear search or check filters!
                </div>
              )}
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
