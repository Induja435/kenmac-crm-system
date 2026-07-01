/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Search, Eye, Clock, Plus, BookCheck, X, FileText, 
  Sparkles, Calendar, ArrowUpRight, CloudLightning 
} from 'lucide-react';
import { KnowledgeDoc } from '../types';

interface KnowledgeBaseViewProps {
  documents: KnowledgeDoc[];
  onAddDocument: (doc: Omit<KnowledgeDoc, 'id' | 'views' | 'updatedAt'>) => void;
}

export default function KnowledgeBaseView({
  documents,
  onAddDocument
}: KnowledgeBaseViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Contribution Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<KnowledgeDoc['category']>('DevOps');
  const [summary, setSummary] = useState('');
  const [readTime, setReadTime] = useState('5 min read');
  const [authorName, setAuthorName] = useState('Sarah Jenkins');
  const [imageUrl, setImageUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Extract unique categories
  const categories = ['All', 'DevOps', 'Security', 'Strategy', 'Frontend', 'Documentation', 'Playbook', 'Standards'];

  // Filter docs
  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmitContribution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !summary) {
      setErrorMessage('Please yield a title and summarizing abstract.');
      return;
    }

    // Default image search if none given
    const img = imageUrl.trim() || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=480&auto=format&fit=crop';

    onAddDocument({
      title,
      category,
      summary,
      readTime,
      authorName,
      authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=260&auto=format&fit=crop',
      imageUrl: img
    });

    // Reset Form Fields
    setTitle('');
    setSummary('');
    setReadTime('5 min read');
    setImageUrl('');
    setErrorMessage('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline text-2xl font-bold text-primary tracking-tight">Enterprise Knowledge Base</h2>
          <p className="text-sm font-medium text-on-surface-variant">Central depository of deployment standard guidelines and engineering playbooks.</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-secondary text-on-secondary-fixed font-headline text-sm font-bold px-4 py-2.5 rounded hover:bg-secondary-fixed transition-all cursor-pointer shadow-sm ml-auto md:ml-0"
        >
          <Plus className="w-4 h-4" />
          <span>Publish Paper</span>
        </button>
      </div>

      {/* Top Banner highlights */}
      <div className="bg-[#1a365d] rounded-xl text-white p-6 relative overflow-hidden shadow">
        {/* Background geometric blur */}
        <div className="absolute top-0 right-0 w-[300px] h-full bg-gradient-to-l from-secondary/15 to-transparent blur-[40px] pointer-events-none" />
        
        <div className="max-w-xl space-y-3 relative z-10 text-left">
          <span className="inline-flex items-center gap-1 bg-secondary text-on-secondary-fixed text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Spotlight Recommendation</span>
          </span>
          <h3 className="font-headline text-lg sm:text-xl font-bold">Standard SApps & DevOps Architecture Guidelines v5</h3>
          <p className="text-xs text-primary-fixed-dim leading-relaxed font-sans">
            Our global technical audit council just authorized our new reference blueprints for AWS multi-zone networking patterns and Terraform continuous deploy configurations.
          </p>
          <button
            onClick={() => alert('Secure file retrieval pipeline for Spotlights initialized. Document Code: Blue-v5')}
            className="px-3.5 py-1.5 bg-white text-primary font-headline text-xs font-bold rounded flex items-center gap-1 hover:bg-primary-fixed transition-colors cursor-pointer"
          >
            <span>Read Spotlights Guideline</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Structured filtration parameters */}
      <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search documents, tags, abstract summaries..."
              className="pl-9 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary w-full"
            />
          </div>

          <div className="text-[11px] font-mono font-bold text-outline uppercase tracking-wider">
            Repository Size: {filteredDocs.length} Whitepapers Loaded
          </div>
        </div>

        {/* Categories filters */}
        <div className="pt-2 border-t border-outline-variant/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-bold text-outline uppercase tracking-wider shrink-0 flex items-center gap-1">
            <BookCheck className="w-3.5 h-3.5" />
            <span>Domain Scope:</span>
          </span>
          
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs font-bold rounded cursor-pointer transition-colors whitespace-nowrap ${
                selectedCategory === cat 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'bg-surface hover:bg-surface-container text-on-surface-variant'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Document Grid catalog */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredDocs.map((doc, idx) => (
            <motion.div
              layout
              key={doc.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              whileHover={{ y: -3 }}
              className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm flex flex-col justify-between group"
            >
              {/* Image Header */}
              <div className="h-40 bg-surface relative overflow-hidden">
                <img
                  src={doc.imageUrl}
                  alt={doc.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Category Pill overlay on top left */}
                <span className="absolute top-3 left-3 text-[9px] font-extrabold uppercase bg-[#00201d]/85 backdrop-blur-md text-secondary-fixed-dim px-2.5 py-1 rounded">
                  {doc.category}
                </span>

                {/* Date stamp overlay on top right */}
                <span className="absolute top-3 right-3 text-[9px] font-mono font-bold bg-[#0b1c30]/85 backdrop-blur-md text-white/90 px-2 py-0.5 rounded">
                  {doc.updatedAt}
                </span>
              </div>

              {/* Text content details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h4 className="font-headline text-base font-bold text-primary group-hover:text-secondary-container transition-colors leading-snug text-left truncate">
                    {doc.title}
                  </h4>
                  <p className="text-xs text-on-surface-variant font-medium leading-relaxed text-left line-clamp-3">
                    {doc.summary}
                  </p>
                </div>

                {/* Footer details, view stats & read duration */}
                <div className="pt-3.5 border-t border-outline-variant/60 flex items-center justify-between text-[11px] font-semibold text-outline">
                  <div className="flex items-center gap-1.5">
                    <img
                      src={doc.authorAvatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=260&auto=format&fit=crop'}
                      alt={doc.authorName}
                      referrerPolicy="no-referrer"
                      className="w-5 h-5 rounded-full object-cover shrink-0"
                    />
                    <span className="text-primary truncate max-w-[90px]">{doc.authorName}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{doc.views}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{doc.readTime}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action trigger footer */}
              <div className="bg-surface-container px-5 py-2.5 border-t border-outline-variant/60 flex items-center justify-between text-xs font-bold text-primary group-hover:bg-primary/5 transition-colors cursor-pointer" onClick={() => alert(`Pulling Secure Library Asset ID: ${doc.id}`)}>
                <span>Read Full Document blueprint</span>
                <ArrowUpRight className="w-4 h-4 text-outline group-hover:text-primary transition-all" />
              </div>
            </motion.div>
          ))}

          {filteredDocs.length === 0 && (
            <div className="col-span-full py-16 text-center text-sm font-semibold text-on-surface-variant max-w-sm mx-auto">
              No technical guidelines match your active keyword string. Clear keyword and search directories again!
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Publication Form dialog box */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-[#0b1c30]/40 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xl w-full max-w-[480px] overflow-hidden z-10 relative"
            >
              <div className="px-6 py-4 border-b border-outline-variant flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary">
                  <FileText className="w-5 h-5 text-secondary" />
                  <h3 className="font-headline font-bold text-base">Contribute Technical Whitepaper</h3>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-outline hover:text-primary p-1 rounded-full hover:bg-surface-container transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitContribution} className="p-6 space-y-4 text-left">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                    Whitepaper Title
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Docker Containerization Best Practices"
                    className="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant rounded text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                </div>

                {/* Category select block */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                    Blueprints Sector Domain
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant rounded text-on-surface text-xs focus:outline-none"
                  >
                    <option value="DevOps">DevOps & AWS Cloud</option>
                    <option value="Security">Cybersecurity Standards</option>
                    <option value="Strategy">Enterprise Consultancy Strategy</option>
                    <option value="Frontend">Frontend Architecture UI</option>
                    <option value="Standards">Quality Coding Standards</option>
                    <option value="Documentation">General Platform Documentation</option>
                    <option value="Playbook">Agile Sprint Playbooks</option>
                  </select>
                </div>

                {/* Author Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                    Author Professional Name
                  </label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Dr. Simon Krenko"
                    className="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant rounded text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Read Duration options */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                    Estimated Reading Duration
                  </label>
                  <select
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant rounded text-on-surface text-xs focus:outline-none"
                  >
                    <option value="3 min read">Short (3 min read)</option>
                    <option value="5 min read">Standard (5 min read)</option>
                    <option value="8 min read">Medium (8 min read)</option>
                    <option value="12 min read">Detailed (12 min read)</option>
                    <option value="20 min read">Technical Study (20 min read)</option>
                  </select>
                </div>

                {/* Summarizing abstract */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                    Summarizing Abstract (Brief Description)
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Enter short summarizing abstract describing variables, libraries, scopes..."
                    className="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant rounded text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none"
                  />
                </div>

                {/* Cover graphic hotlink */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block flex items-center justify-between">
                    <span>Abstract cover image URL (Optional)</span>
                    <span className="text-[9px] text-outline hover:underline cursor-pointer" onClick={() => setImageUrl('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=480&auto=format&fit=crop')}>Load Digital Matrix cover</span>
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant rounded text-on-surface text-xs focus:outline-none"
                  />
                </div>

                {errorMessage && (
                  <div className="text-xs text-error font-medium bg-error-container/20 p-2.5 rounded border border-error-container/30">
                    {errorMessage}
                  </div>
                )}

                <div className="pt-4 border-t border-outline-variant flex justify-end gap-3 font-headline">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-surface hover:bg-surface-container border border-outline-variant text-on-surface text-xs font-bold rounded cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4.5 py-2 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded cursor-pointer"
                  >
                    Publish Document SApps
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
