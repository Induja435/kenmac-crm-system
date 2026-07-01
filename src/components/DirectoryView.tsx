/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, Search, Star, MessageSquare, Check, Plus, X, 
  MapPin, SlidersHorizontal, ArrowUpDown, ShieldCheck, Tag 
} from 'lucide-react';
import { Consultant } from '../types';

interface DirectoryViewProps {
  consultants: Consultant[];
  onAddConsultant: (expert: Omit<Consultant, 'id' | 'rating' | 'reviews'>) => void;
  onNavigateToView: (view: string) => void;
}

export default function DirectoryView({
  consultants,
  onAddConsultant,
  onNavigateToView
}: DirectoryViewProps) {
  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  
  // Tag / Filter states
  const [skillFilter, setSkillFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Available' | 'On Project' | 'Out of Office'>('All');
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'name' | 'status'>('rating');

  // Modal open status
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [skillsRaw, setSkillsRaw] = useState('');
  const [avatar, setAvatar] = useState('');
  const [status, setStatus] = useState<'Available' | 'On Project' | 'Out of Office'>('Available');
  const [errorMessage, setErrorMessage] = useState('');

  // Extract all unique skills to show in quick filter pills
  const allUniqueSkills = Array.from(
    new Set(consultants.flatMap(c => c.skills))
  );

  // Dynamic sorting & filtering logic
  const filteredConsultants = consultants.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = skillFilter === 'All' || c.skills.includes(skillFilter);
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesSkill && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'reviews') return b.reviews - a.reviews;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'status') return a.status.localeCompare(b.status);
    return 0;
  });

  const handleSubmitOnboard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role || !skillsRaw) {
      setErrorMessage('Please declare a Name, verified Role designation, and skills list.');
      return;
    }

    const skillsArr = skillsRaw
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    if (skillsArr.length === 0) {
      setErrorMessage('Define at least one technical qualification skill.');
      return;
    }

    // Default avatars mapping if empty
    const providedAvatar = avatar.trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=260&auto=format&fit=crop';

    onAddConsultant({
      name,
      role,
      avatar: providedAvatar,
      skills: skillsArr,
      status,
    });

    // Reset Onboarding Portal State
    setName('');
    setRole('');
    setSkillsRaw('');
    setAvatar('');
    setStatus('Available');
    setErrorMessage('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      {/* Upper toolbar information */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline text-2xl font-bold text-primary tracking-tight">Technical Partner Network</h2>
          <p className="text-sm font-medium text-on-surface-variant">Onboard, audit, or communicate directly with specialized lead architects.</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-secondary text-on-secondary-fixed font-headline text-sm font-bold px-4 py-2.5 rounded hover:bg-secondary-fixed transition-all cursor-pointer shadow-sm ml-auto md:ml-0"
        >
          <Plus className="w-4 h-4" />
          <span>Provision New Architect</span>
        </button>
      </div>

      {/* Structured Filtration Panel dashboard */}
      <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Filter item 1: Search */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">Keyword Text Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search name, job role..."
                className="pl-9 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary w-full"
              />
            </div>
          </div>

          {/* Filter item 2: Status */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">Contract Availability Status</label>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              >
                <option value="All">All statuses (Available, On SOW, OOO)</option>
                <option value="Available">Available for SOW assignment</option>
                <option value="On Project">Active on Assigned Project SOW</option>
                <option value="Out of Office">Out of Office (OOO)</option>
              </select>
            </div>
          </div>

          {/* Filter item 3: Sort Options */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">Sort Catalogue By</label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              >
                <option value="rating">Industry Rating Score (High → Low)</option>
                <option value="reviews">Client Auditable Sprints Count (High)</option>
                <option value="name">Consultant Name (A-Z)</option>
                <option value="status">Availability Rank Category</option>
              </select>
            </div>
          </div>

        </div>

        {/* Rapid Skill Filter Pills Carousel */}
        <div className="pt-2 border-t border-outline-variant/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-bold text-outline uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" />
            <span>Scope Tech Key:</span>
          </span>
          
          <button
            onClick={() => setSkillFilter('All')}
            className={`px-3 py-1 text-xs font-bold rounded cursor-pointer transition-colors ${
              skillFilter === 'All' 
                ? 'bg-primary text-white shadow-sm' 
                : 'bg-surface hover:bg-surface-container text-on-surface-variant'
            }`}
          >
            All Tech Stack
          </button>
          
          {allUniqueSkills.map(skill => (
            <button
              key={skill}
              onClick={() => setSkillFilter(skill)}
              className={`px-3 py-1 text-xs font-bold rounded cursor-pointer transition-colors whitespace-nowrap ${
                skillFilter === skill 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'bg-surface hover:bg-surface-container text-on-surface-variant font-medium'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Consultants Grid Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredConsultants.map((expert, idx) => (
            <motion.div
              layout
              key={expert.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              whileHover={{ y: -3 }}
              className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 flex flex-col justify-between shadow-sm relative overflow-hidden group"
            >
              {/* Availability bullet dot on top right */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${
                  expert.status === 'Available' 
                    ? 'bg-secondary' 
                    : expert.status === 'On Project' 
                    ? 'bg-blue-500' 
                    : 'bg-orange-500'
                }`} />
                <span className="text-[10px] font-bold text-on-surface-variant">{expert.status}</span>
              </div>

              {/* Main bio panel */}
              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={expert.avatar}
                    alt={expert.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover border border-outline-variant shrink-0"
                  />
                  <div>
                    <h3 className="font-headline text-base font-bold text-primary flex items-center gap-1">
                      <span>{expert.name}</span>
                      <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
                    </h3>
                    <p className="text-xs text-on-surface-variant font-medium">{expert.role}</p>
                  </div>
                </div>

                {/* Stars audit */}
                <div className="flex items-center gap-1.5 bg-surface-container-low p-2 rounded w-fit-content">
                  <div className="flex items-center text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span className="text-xs font-bold text-primary">{expert.rating} Rating</span>
                  <span className="text-[11px] text-outline font-semibold">({expert.reviews} verified audits)</span>
                </div>

                {/* Skills row */}
                <div className="space-y-1.5">
                  <span className="text-[9px] text-outline uppercase font-extrabold tracking-wider block text-left">Specializations</span>
                  <div className="flex flex-wrap gap-1.5">
                    {expert.skills.map(skill => (
                      <span 
                        key={skill}
                        onClick={() => setSkillFilter(skill)}
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded cursor-pointer transition-colors ${
                          skillFilter === skill 
                            ? 'bg-primary text-white' 
                            : 'bg-surface-container text-primary hover:bg-surface-container-high'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Interaction button form */}
              <div className="pt-4 border-t border-outline-variant/60 mt-5 flex items-center justify-between">
                <span className="text-[11px] text-outline font-mono font-semibold">Uptimes Match High</span>
                <button
                  onClick={() => {
                    const subj = prompt(`Type direct communication message regarding active projects for ${expert.name}:`);
                    if(subj) {
                      alert(`Message relay queue: SOW communication sent directly to ${expert.name}.`);
                    }
                  }}
                  className="px-3.5 py-1.5 bg-primary text-white font-headline text-xs font-bold rounded hover:bg-primary-container transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Reach Out</span>
                </button>
              </div>

            </motion.div>
          ))}
          
          {filteredConsultants.length === 0 && (
            <div className="col-span-full py-16 text-center text-sm font-semibold text-on-surface-variant max-w-sm mx-auto">
              No specialists meet the search filters in our current pool. Press "Provision New Architect" to invite coordinates.
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Onboarding Dialog Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-[#0b1c30]/40 backdrop-blur-sm cursor-pointer"
            />
            
            {/* Modal Body Window */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xl w-full max-w-[480px] overflow-hidden z-10 relative"
            >
              <div className="px-6 py-4 border-b border-outline-variant flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary">
                  <Users className="w-5 h-5 text-[#006a61]" />
                  <h3 className="font-headline font-bold text-base">Onboard Enterprise Technical Expert</h3>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-outline hover:text-primary p-1 rounded-full hover:bg-surface-container transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitOnboard} className="p-6 space-y-4">
                {/* Full name input */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Alexis Richardson"
                    className="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant rounded text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                </div>

                {/* Job Designation */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                    Enterprise Technical Designation
                  </label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Principal SecOps Lead"
                    className="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant rounded text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                </div>

                {/* Technologies List */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                    Qualified Stack Specializations (Comma Separated)
                  </label>
                  <input
                    type="text"
                    required
                    value={skillsRaw}
                    onChange={(e) => setSkillsRaw(e.target.value)}
                    placeholder="AWS Lambda, Kubernetes, Terraform, Go"
                    className="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant rounded text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                </div>

                {/* Avatar file selector hotlink */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block flex items-center justify-between">
                    <span>Avatar Portrait Image URL (Optional)</span>
                    <span className="text-[9px] text-outline hover:underline cursor-pointer" onClick={() => setAvatar('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=260&auto=format&fit=crop')}>Load Default Sample</span>
                  </label>
                  <input
                    type="url"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant rounded text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                </div>

                {/* Availability status option list */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                    Starting Availability
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant rounded text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  >
                    <option value="Available">Available (Unassigned)</option>
                    <option value="On Project">Active on Assigned Project SOW</option>
                    <option value="Out of Office">Out of Office (OOO)</option>
                  </select>
                </div>

                {errorMessage && (
                  <div className="text-xs text-error font-medium bg-error-container/20 p-2.5 rounded border border-error-container/30">
                    {errorMessage}
                  </div>
                )}

                <div className="pt-4 border-t border-outline-variant flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-surface hover:bg-surface-container border border-outline-variant text-on-surface font-headline text-xs font-bold rounded cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4.5 py-2 bg-primary hover:bg-primary-container text-white font-headline text-xs font-bold rounded cursor-pointer"
                  >
                    Enroll to Registry
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
