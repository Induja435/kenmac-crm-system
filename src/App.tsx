/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Rocket, LayoutDashboard, Folder, Trello, Users2, BookOpen,
  BarChart3, MessageSquareCode, Menu, X, LogOut, Mail, User
} from 'lucide-react';

// Core State Collections
import {
  INITIAL_INVOICES, INITIAL_PROJECTS, INITIAL_CONSULTANTS,
  INITIAL_TASKS, INITIAL_KNOWLEDGE_DOCS
} from './data';
import { Invoice, Project, Consultant, Task, KnowledgeDoc } from './types';

// Component Views
import LoginView from './components/LoginView';
import DashboardView from './components/DashboardView';
import ProjectView from './components/ProjectView';
import TasksView from './components/TasksView';
import DirectoryView from './components/DirectoryView';
import FinancialsView from './components/FinancialsView';
import KnowledgeBaseView from './components/KnowledgeBaseView';
import ReportsView from './components/ReportsView';
import ContactView from './components/ContactView';

export default function App() {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');

  // Active view tracking
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Mobile navigation drawer toggle
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  // Memory state matrices
  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const savedInvoices = localStorage.getItem('invoices');

    if (savedInvoices) {
      return JSON.parse(savedInvoices);
    }

    return INITIAL_INVOICES;
  });
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [consultants, setConsultants] = useState<Consultant[]>(INITIAL_CONSULTANTS);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [documents, setDocuments] = useState<KnowledgeDoc[]>(INITIAL_KNOWLEDGE_DOCS);
  useEffect(() => {
  localStorage.setItem(
    'invoices',
    JSON.stringify(invoices)
  );
}, [invoices]);

  // Authentication callbacks
  const handleLoginSuccess = (email: string) => {
    setUserEmail(email);
    setIsAuthenticated(true);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
    setActiveTab('dashboard');
    setSelectedProjectId(null);
  };

  // State Management functions (Mutations in reactive memory)
  const handleAddInvoice = (newInvoice: Omit<Invoice, 'id'>) => {
    const nextId = `INV-2023-${String(100 + invoices.length).padStart(3, '0')}`;
    setInvoices(prev => [
      { id: nextId, ...newInvoice },
      ...prev
    ]);
  };

  const handleDeleteInvoice = (id: string) => {
    setInvoices(prev => prev.filter(inv => inv.id !== id));
  };

  const handleUpdateInvoice = (updatedInvoice: Invoice) => {
    setInvoices(prev =>
      prev.map(inv =>
        inv.id === updatedInvoice.id
          ? updatedInvoice
          : inv
      )
    );
  };

  const handleAddConsultant = (newConsultant: Omit<Consultant, 'id' | 'rating' | 'reviews'>) => {
    const nextId = `CONS-${String(consultants.length + 1).padStart(3, '0')}`;
    setConsultants(prev => [
      ...prev,
      {
        id: nextId,
        rating: 5.0,
        reviews: 0,
        ...newConsultant
      }
    ]);
  };

  const handleAddTask = (newTask: Omit<Task, 'id'>) => {
    const nextId = `TASK-${String(tasks.length + 1).padStart(3, '0')}`;
    setTasks(prev => [
      ...prev,
      { id: nextId, ...newTask }
    ]);
  };

  const handleUpdateTaskStatus = (id: string, status: Task['status']) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  const handleAddDocument = (newDoc: Omit<KnowledgeDoc, 'id' | 'views' | 'updatedAt'>) => {
    const nextId = `DOC-${String(documents.length + 1).padStart(3, '0')}`;
    setDocuments(prev => [
      {
        id: nextId,
        views: 45,
        updatedAt: 'Just now',
        ...newDoc
      },
      ...prev
    ]);
  };

  // Helper inside navigation to route direct jump
  const navigateToProjectDirect = (projectId: string) => {
    setSelectedProjectId(projectId);
    setActiveTab('projects');
  };

  // Navigation catalog links mapping
  const navigationLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Project', icon: Folder },
    { id: 'tasks', label: 'Tasks', icon: Trello },
    { id: 'directory', label: 'Directory', icon: Users2 },
    { id: 'financials', label: 'Financials', icon: BarChart3 },
    { id: 'kb', label: 'Knowledge Base', icon: BookOpen },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'contact', label: 'Contacts', icon: MessageSquareCode }
  ];

  // Helper inside viewport to determine rendering
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardView
            invoices={invoices}
            projects={projects}
            onAddInvoice={handleAddInvoice}
            onDeleteInvoice={handleDeleteInvoice}
            onUpdateInvoice={handleUpdateInvoice}
            onNavigateToView={setActiveTab}
            onNavigateToProject={navigateToProjectDirect}
          />
        );
      case 'projects':
        return (
          <ProjectView
            projects={projects}
            consultants={consultants}
            selectedProjectId={selectedProjectId}
            onSelectProject={setSelectedProjectId}
            onNavigateToView={setActiveTab}
          />
        );
      case 'tasks':
        return (
          <TasksView
            tasks={tasks}
            projects={projects}
            consultants={consultants}
            onAddTask={handleAddTask}
            onUpdateTaskStatus={handleUpdateTaskStatus}
          />
        );
      case 'directory':
        return (
          <DirectoryView
            consultants={consultants}
            onAddConsultant={handleAddConsultant}
            onNavigateToView={setActiveTab}
          />
        );
      case 'financials':
        return (
          <FinancialsView />
        );
      case 'kb':
        return (
          <KnowledgeBaseView
            documents={documents}
            onAddDocument={handleAddDocument}
          />
        );
      case 'reports':
        return <ReportsView />;
      case 'contact':
        return <ContactView />;
      default:
        return <div>Snapshot view not resolved.</div>;
    }
  };

  // If unauthorized, return original pixel-perfect LoginPage interface
  if (!isAuthenticated) {
    return <LoginView onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="bg-mesh min-h-screen flex text-slate-900 font-sans antialiased">

      {/* SIDEBAR NAVIGATION GRID (DESKTOP) */}
      <aside className="w-64 bg-slate-900 text-slate-400 border-r border-slate-800 hidden lg:flex flex-col justify-between shrink-0 select-none">

        {/* Upper logo & branding */}
        <div>
          <div className="p-6 border-b border-slate-800 flex items-center gap-3">
            <div>
              <h1 className="font-sans text-base font-bold text-white tracking-tight">KENMAC PORTAL</h1>
              <span className="text-[10px] text-slate-500 font-semibold block uppercase tracking-widest mt-0.5">Enterprise Suite</span>
            </div>
          </div>

          {/* Links cluster */}
          <nav className="p-4 space-y-1 text-left">
            {navigationLinks.map((link) => {
              const LinkIcon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    if (link.id !== 'projects') setSelectedProjectId(null);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm font-sans text-sm font-medium transition-all cursor-pointer ${isActive
                    ? 'bg-blue-600/10 text-blue-400 border-r-4 border-blue-600 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                >
                  <LinkIcon className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-white" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Lower Architect info profile & Logout */}
        <div className="p-4 border-t border-slate-800 space-y-4">
          <div className="flex items-center gap-3 px-3">
            <div className="w-8 h-8 rounded bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-xs shadow-sm">
              KT
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate font-sans">Enterprise Partner</div>
              <div className="text-[10px] text-slate-500 truncate">{userEmail}</div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign out Partner Session</span>
          </button>
        </div>

      </aside>

      {/* MOBILE DRAWER DRAWER OVERLAY */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            {/* Overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm cursor-pointer"
            />

            {/* Menu container */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-4 z-10"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <span className="font-sans font-bold text-white text-sm">KENMAC PORTAL</span>
                  </div>
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="text-slate-400 border border-slate-800 p-1 rounded-full hover:bg-white/10 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <nav className="space-y-1 text-left">
                  {navigationLinks.map((link) => {
                    const LinkIcon = link.icon;
                    const isActive = activeTab === link.id;
                    return (
                      <button
                        key={link.id}
                        onClick={() => {
                          setActiveTab(link.id);
                          setSelectedProjectId(null);
                          setIsMobileOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm font-sans text-sm font-medium cursor-pointer ${isActive
                          ? 'bg-blue-600/10 text-blue-400 border-r-4 border-blue-600 font-semibold shadow-sm'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                          }`}
                      >
                        <LinkIcon className="w-4 h-4 shrink-0 text-slate-400" />
                        <span>{link.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-4 text-left">
                <div className="px-3">
                  <div className="text-xs font-bold text-white font-sans">Enterprise Partner</div>
                  <div className="text-[10px] text-slate-500 truncate">{userEmail}</div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold rounded text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* DETAILED ROOT WORKSPACE FRAME */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">

        {/* TOP STATUS NAVIGATION BAR */}
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 shrink-0 relative select-none">
          <div className="flex items-center gap-4">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-1.5 border border-slate-200 rounded hover:bg-slate-50 cursor-pointer transition-colors"
            >
              <Menu className="w-5 h-5 text-slate-700" />
            </button>

            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              <span>System Online</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-bold text-slate-800 tracking-tight font-sans">KENMAC CLOUD NETWORK</span>
              <span className="text-[10px] text-slate-500 font-medium mt-0.5">Secure Professional Workspace</span>
            </div>

            {/* Connected security node visual trigger */}
            <div
              onClick={() => {
                alert(`Security Verification:\n\nSession Status: Secure\nAuthorized User: Partner\nEncryption: TLS v1.3`);
              }}
              className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-500 cursor-pointer transition-colors"
              title="Verify Security Credentials"
            >
              <User className="w-4 h-4 shrink-0" />
            </div>
          </div>
        </header>

        {/* WORKSPACE MIDDLE VIEWPORT */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 max-w-7xl w-full mx-auto relative z-10">

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + (selectedProjectId ? `-${selectedProjectId}` : '')}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>

        </main>

        {/* WORKSPACE FOOTER */}
        <footer className="py-4 border-t border-outline-variant bg-surface-container text-center text-[10px] sm:text-xs text-on-surface-variant font-medium select-none">
          <p>© {new Date().getFullYear()} Kenmac Solutions. Fully Integrated CRM & Partner Portal Engine.</p>
        </footer>

      </div>

    </div>
  );
}
