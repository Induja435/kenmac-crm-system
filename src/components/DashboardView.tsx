/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  DollarSign,
  FileText,
  TrendingUp,
  Clock,
  Search,
  Filter,
  Plus,
  Trash2,
  Pencil,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  ChevronRight,
  BarChart3,
  HelpCircle
} from 'lucide-react';
import { Invoice, Project } from '../types';

interface DashboardViewProps {
  invoices: Invoice[];
  projects: Project[];
  onAddInvoice: (invoice: Omit<Invoice, 'id'>) => void;
  onDeleteInvoice: (id: string) => void;
  onUpdateInvoice: (invoice: Invoice) => void;
  onNavigateToView: (view: string) => void;
  onNavigateToProject: (projectId: string) => void;
}

export default function DashboardView({
  invoices,
  projects,
  onAddInvoice,
  onDeleteInvoice,
  onUpdateInvoice,
  onNavigateToView,
  onNavigateToProject
}: DashboardViewProps) {
  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Paid' | 'Pending' | 'Overdue'>('All');

  // Create Invoice Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [client, setClient] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState<'Paid' | 'Pending'>('Pending');
  const [errorMessage, setErrorMessage] = useState('');

  // Interactive SVG chart hover state
  const [activeSegment, setActiveSegment] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedInvoice, setEditedInvoice] = useState<any>({});

  // Filtered invoices
  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = inv.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // KPI Calculations
  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalPending = invoices.filter(inv => inv.status === 'Pending').reduce((sum, inv) => sum + inv.amount, 0);
  const totalPaid = invoices.filter(inv => inv.status === 'Paid').reduce((sum, inv) => sum + inv.amount, 0);
  const totalOverdue = invoices.filter(inv => inv.status === 'Overdue').reduce((sum, inv) => sum + inv.amount, 0);

  // Chart data for Budget Distribution (represented as interactive segments)
  const stackData = [
    { name: 'Cloud & Kubernetes', value: 45000, color: '#1e3a8a', percentage: '38%' },
    { name: 'AI & Machine Learning', value: 38000, color: '#2563eb', percentage: '32%' },
    { name: 'Application Security', value: 20000, color: '#475569', percentage: '17%' },
    { name: 'React Development', value: 15400, color: '#93c5fd', percentage: '13%' },
  ];
  const chartTotal = stackData.reduce((sum, d) => sum + d.value, 0);

  // ==========================
  // EDIT INVOICE FUNCTIONS
  // ==========================
  const handleEdit = (invoice: Invoice) => {
    setEditingId(invoice.id);
    setEditedInvoice({ ...invoice });
  };

  const handleSave = () => {
    onUpdateInvoice(editedInvoice);
    setEditingId(null);
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!client || !selectedProject || !amount || !dueDate) {
      setErrorMessage('Please yield answers for all compulsory inputs.');
      return;
    }
    const valAmount = parseFloat(amount);
    if (isNaN(valAmount) || valAmount <= 0) {
      setErrorMessage('Amount must represent a verified positive number value.');
      return;
    }

    onAddInvoice({
      client,
      project: selectedProject,
      amount: valAmount,
      dueDate: new Date(dueDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      status,
    });

    // Reset fields
    setClient('');
    setSelectedProject('');
    setAmount('');
    setDueDate('');
    setStatus('Pending');
    setErrorMessage('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      {/* Dynamic Upper Bar Welcome Text */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="font-headline text-2xl font-bold tracking-tight text-primary">
            Consultancy Dashboard
          </h2>
          <p className="text-sm font-medium text-on-surface-variant">
            Partner portal snapshot & real-time capital ledger.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-secondary text-on-secondary-fixed font-headline text-sm font-bold px-4 py-2.5 rounded hover:bg-secondary-fixed transition-all cursor-pointer shadow-sm active:scale-95"
            id="btn-create-invoice"
          >
            <Plus className="w-4 h-4" />
            <span>Issue New Invoice</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Grid Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* KPI 1 - Gross capital */}
        <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Gross Capital Ledger</span>
            <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold font-headline text-primary tracking-tight">
              ${totalInvoiced.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
            <p className="text-xs font-semibold text-secondary mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% compared to Q3 cycle</span>
            </p>
          </div>
        </div>

        {/* KPI 2 - Pending capital */}
        <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Pending Capital</span>
            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold font-headline text-orange-600 tracking-tight">
              ${totalPending.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
            <p className="text-xs font-semibold text-on-surface-variant mt-1">
              {invoices.filter(i => i.status === 'Pending').length} Pending customer approvals
            </p>
          </div>
        </div>

        {/* KPI 3 - Project Budget Efficiency */}
        <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Project Budget Efficiency</span>
            <div className="w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold font-headline text-primary tracking-tight">
              92.4%
            </h3>
            <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-2.5 overflow-hidden">
              <div className="bg-secondary h-full rounded-full" style={{ width: '92.4%' }} />
            </div>
          </div>
        </div>

        {/* KPI 4 - Engineering Hours */}
        <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Active Consultancy Hrs</span>
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold font-headline text-primary tracking-tight">
              1,420 <span className="text-xs text-on-surface-variant font-medium">hrs</span>
            </h3>
            <p className="text-xs font-semibold text-secondary mt-1">
              96% utilization target met
            </p>
          </div>
        </div>
      </div>

      {/* Main Split Body: Interactive SVGs & Invoices Registry */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Hand: Invoices Grid Tab (Takes 2 Columns) */}
        <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm flex flex-col overflow-hidden">
          <div className="p-6 border-b border-outline-variant flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="font-headline text-base font-bold text-primary">Recent Invoices Registry</h3>
            </div>

            {/* Search inputs */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Client or Project..."
                className="pl-9 pr-4 py-1.5 bg-surface-container-low border border-outline-variant rounded text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary w-52"
              />
            </div>
          </div>

          {/* Tab Filter Links */}
          <div className="px-6 py-3 bg-surface-container-low border-b border-outline-variant flex items-center justify-between">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {(['All', 'Paid', 'Pending', 'Overdue'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  className={`px-3 py-1.5 text-xs font-bold rounded cursor-pointer transition-colors whitespace-nowrap ${statusFilter === tab
                    ? 'bg-primary text-white'
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="text-[11px] text-outline font-bold uppercase tracking-wider hidden sm:block">
              Showing {filteredInvoices.length} invoices
            </div>
          </div>

          {/* Invoices List Core View */}
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-container/30 text-on-surface-variant text-[10px] font-bold uppercase tracking-wider">
                  <th className="px-6 py-3.5">Invoice ID</th>
                  <th className="px-6 py-3.5">Client & Project</th>
                  <th className="px-6 py-3.5 text-right">Ledger Amount</th>
                  <th className="px-6 py-3.5">Due Date</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/60 font-sans text-xs">
                <AnimatePresence initial={false}>
                  {filteredInvoices.length > 0 ? (
                    filteredInvoices.map((inv) => (
                      <motion.tr
                        key={inv.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-surface-container-low/40 transition-colors group"
                      >
                        <td className="px-6 py-4 font-mono font-bold text-primary">
                          {inv.id}
                        </td>

                        <td className="px-6 py-4">
                          {editingId === inv.id ? (
                            <div className="space-y-2">
                              <input
                                value={editedInvoice.client}
                                onChange={(e) =>
                                  setEditedInvoice({
                                    ...editedInvoice,
                                    client: e.target.value,
                                  })
                                }
                                className="w-full px-2 py-1 border border-outline-variant rounded bg-surface-container-low text-xs"
                              />

                              <input
                                value={editedInvoice.project}
                                onChange={(e) =>
                                  setEditedInvoice({
                                    ...editedInvoice,
                                    project: e.target.value,
                                  })
                                }
                                className="w-full px-2 py-1 border border-outline-variant rounded bg-surface-container-low text-xs"
                              />
                            </div>
                          ) : (
                            <>
                              <div className="font-semibold text-primary">
                                {inv.client}
                              </div>
                              <div className="text-on-surface-variant mt-0.5 text-[11px]">
                                {inv.project}
                              </div>
                            </>
                          )}
                        </td>

                        <td className="px-6 py-4 text-right font-mono font-bold text-primary">
                          {editingId === inv.id ? (
                            <input
                              type="number"
                              value={editedInvoice.amount}
                              onChange={(e) =>
                                setEditedInvoice({
                                  ...editedInvoice,
                                  amount: Number(e.target.value),
                                })
                              }
                              className="w-28 px-2 py-1 border border-outline-variant rounded bg-surface-container-low text-right"
                            />
                          ) : (
                            `$${inv.amount.toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}`
                          )}
                        </td>

                        <td className="px-6 py-4">
                          {editingId === inv.id ? (
                            <input
                              type="text"
                              value={editedInvoice.dueDate}
                              onChange={(e) =>
                                setEditedInvoice({
                                  ...editedInvoice,
                                  dueDate: e.target.value,
                                })
                              }
                              className="px-2 py-1 border border-outline-variant rounded bg-surface-container-low text-xs"
                            />
                          ) : (
                            inv.dueDate
                          )}
                        </td>

                        <td className="px-6 py-4">
                          {editingId === inv.id ? (
                            <select
                              value={editedInvoice.status}
                              onChange={(e) =>
                                setEditedInvoice({
                                  ...editedInvoice,
                                  status: e.target.value,
                                })
                              }
                              className="px-2 py-1 border border-outline-variant rounded bg-surface-container-low text-xs"
                            >
                              <option value="Paid">Paid</option>
                              <option value="Pending">Pending</option>
                              <option value="Overdue">Overdue</option>
                            </select>
                          ) : (
                            <span
                              className={`inline-flex items-center gap-1 py-1 px-2.5 rounded text-[11px] font-bold ${inv.status === 'Paid'
                                ? 'bg-secondary-container text-on-secondary-container'
                                : inv.status === 'Pending'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-red-100 text-red-800'
                                }`}
                            >
                              {inv.status}
                            </span>
                          )}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">

                            {editingId === inv.id ? (
                              <>
                                <button
                                  onClick={handleSave}
                                  className="p-1 rounded text-green-600 hover:bg-green-100 transition-all"
                                  title="Save"
                                >
                                  <Save className="w-4 h-4" />
                                </button>

                                <button
                                  onClick={() => setEditingId(null)}
                                  className="p-1 rounded text-gray-500 hover:bg-gray-100 transition-all"
                                  title="Cancel"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => handleEdit(inv)}
                                className="p-1 rounded text-blue-600 hover:bg-blue-100 transition-all"
                                title="Edit"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                            )}

                            <button
                              onClick={() => onDeleteInvoice(inv.id)}
                              className="text-outline hover:text-error p-1 rounded hover:bg-error-container/20 transition-all"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-sm font-medium text-on-surface-variant bg-surface/50">
                        No active invoices registered under filters.
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Hand: Interactive Tech Stack Chart & Projects Quick Access */}
        <div className="space-y-6 flex flex-col">

          {/* Tech Spec Donut */}
          <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm flex flex-col">
            <h3 className="font-headline text-base font-bold text-primary mb-1">Financial Technology Spends</h3>
            <p className="text-xs text-on-surface-variant font-medium mb-4">Capital allocation by specialization stack.</p>

            {/* Elegant Custom Interactive HTML/SVG Pie-Donut */}
            <div className="flex flex-col items-center justify-center py-4 relative">
              <svg width="180" height="180" viewBox="0 0 42 42" className="transform -rotate-90">
                {/* Circle Segment 1: Cloud & Kubernetes (38% -> dasharray: 38, offset: 100) */}
                <circle
                  cx="21" cy="21" r="15.915"
                  fill="transparent" stroke="#1e3a8a" strokeWidth="4.2"
                  strokeDasharray="38 62" strokeDashoffset="100"
                  className="transition-all duration-300 cursor-pointer origin-center"
                  style={{ transform: activeSegment === 0 ? 'scale(1.05)' : 'scale(1)' }}
                  onMouseEnter={() => setActiveSegment(0)}
                  onMouseLeave={() => setActiveSegment(null)}
                />
                {/* Circle Segment 2: AI & LLM (32% -> dasharray: 32, offset: 62) */}
                <circle
                  cx="21" cy="21" r="15.915"
                  fill="transparent" stroke="#2563eb" strokeWidth="4.2"
                  strokeDasharray="32 68" strokeDashoffset="62"
                  className="transition-all duration-300 cursor-pointer origin-center"
                  style={{ transform: activeSegment === 1 ? 'scale(1.05)' : 'scale(1)' }}
                  onMouseEnter={() => setActiveSegment(1)}
                  onMouseLeave={() => setActiveSegment(null)}
                />
                {/* Circle Segment 3: AppSec (17% -> dasharray: 17, offset: 30) */}
                <circle
                  cx="21" cy="21" r="15.915"
                  fill="transparent" stroke="#475569" strokeWidth="4.2"
                  strokeDasharray="17 83" strokeDashoffset="30"
                  className="transition-all duration-300 cursor-pointer origin-center"
                  style={{ transform: activeSegment === 2 ? 'scale(1.05)' : 'scale(1)' }}
                  onMouseEnter={() => setActiveSegment(2)}
                  onMouseLeave={() => setActiveSegment(null)}
                />
                {/* Circle Segment 4: React Dev (13% -> dasharray: 13, offset: 13) */}
                <circle
                  cx="21" cy="21" r="15.915"
                  fill="transparent" stroke="#93c5fd" strokeWidth="4.2"
                  strokeDasharray="13 87" strokeDashoffset="13"
                  className="transition-all duration-300 cursor-pointer origin-center"
                  style={{ transform: activeSegment === 3 ? 'scale(1.05)' : 'scale(1)' }}
                  onMouseEnter={() => setActiveSegment(3)}
                  onMouseLeave={() => setActiveSegment(null)}
                />
                {/* Centered Donut Hole with Dynamic Overlay */}
                <circle cx="21" cy="21" r="13.5" fill="#ffffff" />
              </svg>

              {/* Centered Labels Inside SVG Container */}
              <div className="absolute flex flex-col items-center justify-center pointer-events-none text-center">
                <span className="text-[10px] font-bold text-outline uppercase tracking-widest">
                  {activeSegment !== null ? stackData[activeSegment].percentage : 'Total Spends'}
                </span>
                <span className="text-sm font-bold text-primary font-headline mt-0.5">
                  {activeSegment !== null
                    ? `$${stackData[activeSegment].value.toLocaleString()}`
                    : `$${chartTotal.toLocaleString()}`
                  }
                </span>
              </div>
            </div>

            {/* SVG Interactive Legend */}
            <div className="mt-4 space-y-2.5">
              {stackData.map((stack, idx) => (
                <div
                  key={stack.name}
                  onMouseEnter={() => setActiveSegment(idx)}
                  onMouseLeave={() => setActiveSegment(null)}
                  className={`flex items-center justify-between p-2 rounded transition-colors cursor-pointer ${activeSegment === idx ? 'bg-surface-container-low' : 'hover:bg-surface-container/20'
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: stack.color }}
                    />
                    <span className="text-xs font-semibold text-primary">{stack.name}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-on-surface-variant">{stack.percentage}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Projects Quick launcher list */}
          <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl shadow-sm flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-headline text-base font-bold text-primary">Active Strategic Initiatives</h3>
                <button
                  onClick={() => onNavigateToView('projects')}
                  className="text-xs font-bold text-secondary hover:underline flex items-center transition-all cursor-pointer"
                >
                  <span>Explore</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Projects Array launcher */}
              <div className="space-y-3">
                {projects.slice(0, 3).map(proj => (
                  <div
                    key={proj.id}
                    onClick={() => onNavigateToProject(proj.id)}
                    className="flex items-center justify-between p-3 border border-outline-variant/60 rounded bg-surface hover:border-primary/40 hover:bg-surface-container-low transition-all cursor-pointer group"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="text-xs font-bold text-primary truncate">{proj.name}</div>
                      <div className="text-[10px] text-on-surface-variant font-medium mt-0.5 truncate max-w-[170px]">{proj.description}</div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      {/* Percent progress */}
                      <span className="text-xs font-mono font-bold text-primary">{proj.overallProgress}%</span>
                      {/* Navigate trigger arrow */}
                      <ChevronRight className="w-4 h-4 text-outline group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3.5 border-t border-outline-variant text-center bg-surface-container-low/40 p-2.5 rounded">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">Currently Supervised Portfolios</span>
              <span className="text-xs font-bold text-primary inline-block mt-0.5">{projects.length} Enterprise Deployments</span>
            </div>
          </div>

        </div>
      </div>

      {/* High Fidelity Create Invoice Modal / Dialog */}
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

            {/* Modal Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xl w-full max-w-[480px] overflow-hidden z-10 relative"
            >
              <div className="px-6 py-4 border-b border-outline-variant flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary">
                  <FileText className="w-5 h-5" />
                  <h3 className="font-headline font-bold text-base">Issue New Partner Invoice</h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-outline hover:text-primary p-1 rounded-full hover:bg-surface-container transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateInvoice} className="p-6 space-y-4">
                {/* Client Select / Input */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                    Client Association
                  </label>
                  <input
                    type="text"
                    required
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    placeholder="e.g. Starling Logistics Co"
                    className="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant rounded text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                </div>

                {/* Project selector */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                    Project Allocation SOW
                  </label>
                  <select
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant rounded text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  >
                    <option value="">-- Select Active Project --</option>
                    {projects.map(p => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                    <option value="Consultancy Retainer Fee">Consultancy Retainer Fee</option>
                    <option value="Ad-hoc SysOps Hardening">Ad-hoc SysOps Hardening</option>
                  </select>
                </div>

                {/* Grid Double Row: Capital cost & Due date */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Amount */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                      Ledger Amount (USD)
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
                      <input
                        type="number"
                        required
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="25000"
                        className="w-full pl-8 pr-3 py-2.5 bg-surface-container-low border border-outline-variant rounded text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      />
                    </div>
                  </div>

                  {/* Due Date */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                      Payment Due Date
                    </label>
                    <input
                      type="date"
                      required
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant rounded text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>

                {/* Status Toggle Radio */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                    Starting Registry Status
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className={`flex items-center gap-2 p-2.5 border rounded cursor-pointer transition-colors ${status === 'Pending'
                      ? 'border-amber-400 bg-amber-50/40 text-amber-900 font-bold'
                      : 'border-outline-variant bg-surface-container hover:bg-surface-container-low'
                      }`}>
                      <input
                        type="radio"
                        name="status"
                        checked={status === 'Pending'}
                        onChange={() => setStatus('Pending')}
                        className="text-amber-600 focus:ring-0"
                      />
                      <span className="text-xs">Pending Approval</span>
                    </label>

                    <label className={`flex items-center gap-2 p-2.5 border rounded cursor-pointer transition-colors ${status === 'Paid'
                      ? 'border-secondary bg-secondary-container/10 text-on-secondary-container font-bold'
                      : 'border-outline-variant bg-surface-container hover:bg-surface-container-low'
                      }`}>
                      <input
                        type="radio"
                        name="status"
                        checked={status === 'Paid'}
                        onChange={() => setStatus('Paid')}
                        className="text-secondary focus:ring-0"
                      />
                      <span className="text-xs">Mark fully Paid</span>
                    </label>
                  </div>
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
                    className="px-4 py-2 bg-surface hover:bg-surface-container border border-outline-variant text-on-surface tracking-wide font-headline text-xs font-bold rounded cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4.5 py-2 bg-primary hover:bg-primary-container text-white tracking-wide font-headline text-xs font-bold rounded cursor-pointer shadow-sm active:scale-95"
                  >
                    Commit to Ledger
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
