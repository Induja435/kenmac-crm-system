/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trello, List, Search, Plus, X, ArrowLeftRight, ChevronRight, 
  ChevronLeft, AlertOctagon, AlertTriangle, Info, CheckCircle2, UserPlus, FolderKanban 
} from 'lucide-react';
import { Task, Project, Consultant } from '../types';

interface TasksViewProps {
  tasks: Task[];
  projects: Project[];
  consultants: Consultant[];
  onAddTask: (task: Omit<Task, 'id'>) => void;
  onUpdateTaskStatus: (id: string, status: Task['status']) => void;
}

export default function TasksView({
  tasks,
  projects,
  consultants,
  onAddTask,
  onUpdateTaskStatus
}: TasksViewProps) {
  // Backlog state toggles
  const [viewMode, setViewMode] = useState<'board' | 'list'>('board');
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<'All' | 'Blocker' | 'High' | 'Medium' | 'Low'>('All');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('All');

  // Backlog Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [project, setProject] = useState('');
  const [assigneeName, setAssigneeName] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('High');
  const [status, setStatus] = useState<Task['status']>('To Do');
  const [categoryName, setCategoryName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Sprints filter
  const [sprintFilter, setSprintFilter] = useState<'All' | 'SP-24' | 'SP-25'>('All');

  // Core filter logic
  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter;
    const matchesAssignee = assigneeFilter === 'All' || t.assigneeName === assigneeFilter;
    const matchesSprint = sprintFilter === 'All' || t.sprint === sprintFilter;
    return matchesSearch && matchesPriority && matchesAssignee && matchesSprint;
  });

  // Kanban status columns definition
  const columns: { name: Task['status']; color: string; bg: string }[] = [
    { name: 'To Do', color: 'text-slate-800', bg: 'bg-slate-100 border-slate-200' },
    { name: 'In Progress', color: 'text-amber-800', bg: 'bg-amber-50 border-amber-200/60' },
    { name: 'Review', color: 'text-blue-800', bg: 'bg-blue-50 border-blue-200/60' },
    { name: 'Done', color: 'text-green-800', bg: 'bg-green-50/60 border-green-200/50' }
  ];

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !project || !assigneeName) {
      setErrorMessage('Please feed values to title, project connection, and engineer assignee.');
      return;
    }

    // Capture assignee avatar
    const selectedConsultant = consultants.find(c => c.name === assigneeName);
    const avatarUrl = selectedConsultant?.avatar || 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?q=80&w=260&auto=format&fit=crop';

    onAddTask({
      title,
      project,
      assigneeName,
      assigneeAvatar: avatarUrl,
      priority,
      status,
      sprint: sprintFilter === 'All' ? 'SP-24' : sprintFilter,
      categoryName: categoryName || 'Unassigned Node',
    });

    // Reset task form wizard
    setTitle('');
    setProject('');
    setAssigneeName('');
    setCategoryName('');
    setPriority('High');
    setStatus('To Do');
    setIsModalOpen(false);
    setErrorMessage('');
  };

  // Helper inside card to render icon representing ticket priority
  const renderPriorityIcon = (prio: Task['priority']) => {
    switch (prio) {
      case 'Blocker':
        return <AlertOctagon className="w-3.5 h-3.5 text-red-600 animate-bounce" title="Blocker Priority" />;
      case 'High':
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-500" title="High Priority" />;
      case 'Medium':
        return <Info className="w-3.5 h-3.5 text-blue-500" title="Medium Priority" />;
      case 'Low':
        return <CheckCircle2 className="w-3.5 h-3.5 text-green-500" title="Low Priority" />;
    }
  };

  // Status transitions
  const moveTask = (task: Task, direction: 'forward' | 'backward') => {
    const statuses: Task['status'][] = ['To Do', 'In Progress', 'Review', 'Done'];
    const currentIdx = statuses.indexOf(task.status);
    let targetIdx = currentIdx;
    
    if (direction === 'forward' && currentIdx < statuses.length - 1) {
      targetIdx += 1;
    } else if (direction === 'backward' && currentIdx > 0) {
      targetIdx -= 1;
    }

    if (targetIdx !== currentIdx) {
      onUpdateTaskStatus(task.id, statuses[targetIdx]);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Header toolbar stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline text-2xl font-bold text-primary tracking-tight">Enterprise Sprint Board</h2>
          <p className="text-sm font-medium text-on-surface-variant">Agile backlog monitoring and scrum tracking interfaces.</p>
        </div>

        <div className="flex items-center gap-3">
          {/* List/Board Toggler */}
          <div className="bg-surface-container border border-outline-variant p-0.5 rounded flex items-center">
            <button
              onClick={() => setViewMode('board')}
              className={`p-1.5 rounded transition-all cursor-pointer ${viewMode === 'board' ? 'bg-white text-primary shadow-sm font-bold' : 'text-outline hover:text-primary'}`}
              title="Kanban Board View"
            >
              <Trello className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded transition-all cursor-pointer ${viewMode === 'list' ? 'bg-white text-primary shadow-sm font-bold' : 'text-outline hover:text-primary'}`}
              title="List Feed view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-secondary text-on-secondary-fixed font-headline text-sm font-bold px-4 py-2 rounded hover:bg-secondary-fixed transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Construct Ticket</span>
          </button>
        </div>
      </div>

      {/* Structured filtration parameters */}
      <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          
          {/* Text input search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tasks, boards..."
              className="pl-9 pr-4 py-1.5 bg-surface-container-low border border-outline-variant rounded text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary w-52"
            />
          </div>

          {/* Sprint Toggle */}
          <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded border border-outline-variant/60">
            {(['All', 'SP-24', 'SP-25'] as const).map(sp => (
              <button
                key={sp}
                onClick={() => setSprintFilter(sp)}
                className={`px-3 py-1 text-[11px] font-bold rounded cursor-pointer transition-colors ${
                  sprintFilter === sp
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container/30'
                }`}
              >
                {sp}
              </button>
            ))}
          </div>

          {/* Priority filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as any)}
            className="px-3 py-1.5 bg-surface-container-low border border-outline-variant rounded text-on-surface text-xs focus:outline-none"
          >
            <option value="All">All Priorities</option>
            <option value="Blocker">⚠️ Blockers</option>
            <option value="High">🔴 High Priority</option>
            <option value="Medium">🔵 Medium</option>
            <option value="Low">🟢 Low</option>
          </select>

          {/* Assignee filter */}
          <select
            value={assigneeFilter}
            onChange={(e) => setAssigneeFilter(e.target.value)}
            className="px-3 py-1.5 bg-surface-container-low border border-outline-variant rounded text-on-surface text-xs focus:outline-none"
          >
            <option value="All">All Assignees</option>
            {consultants.map(c => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>

        </div>

        <div className="text-[11px] font-mono font-bold text-outline uppercase tracking-wide">
          Sprints Backlog: {filteredTasks.length} Tickets Loaded
        </div>
      </div>

      {/* CORE PRESENTATION DUAL RENDER */}
      <AnimatePresence mode="wait">
        
        {/* RENDER A: KANBAN SCRUM BOARD */}
        {viewMode === 'board' ? (
          <motion.div
            key="board-rendering"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {columns.map(col => {
              const columnTasks = filteredTasks.filter(t => t.status === col.name);
              return (
                <div key={col.name} className={`rounded-xl border ${col.bg} p-4 flex flex-col min-h-[480px]`}>
                  {/* Column Header */}
                  <div className="flex items-center justify-between mb-4 border-b border-outline-variant/60 pb-2">
                    <span className={`font-headline text-sm font-bold ${col.color}`}>
                      {col.name}
                    </span>
                    <span className="text-xs font-mono font-bold text-on-surface-variant bg-white border px-1.5 py-0.5 rounded-full">
                      {columnTasks.length}
                    </span>
                  </div>

                  {/* Column ticket stack */}
                  <div className="space-y-3 flex-1 overflow-y-auto max-h-[520px] pr-1">
                    {columnTasks.map(task => (
                      <motion.div
                        layout
                        key={task.id}
                        className="bg-surface-container-lowest border border-outline-variant rounded-lg p-3.5 shadow-sm space-y-3 group hover:border-primary/45 transition-colors"
                      >
                        {/* Tags / Priority header */}
                        <div className="flex items-center justify-between">
                          <span className={`inline-flex items-center gap-1 text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                            task.priority === 'Blocker' 
                              ? 'bg-red-100 text-red-800' 
                              : task.priority === 'High' 
                              ? 'bg-amber-150 text-amber-900' 
                              : 'bg-surface-container text-primary'
                          }`}>
                            {renderPriorityIcon(task.priority)}
                            <span className="ml-0.5">{task.priority}</span>
                          </span>

                          <span className="text-[10px] text-outline font-mono font-bold">
                            {task.sprint}
                          </span>
                        </div>

                        {/* Title & project mapping */}
                        <div>
                          <h4 className="text-xs font-bold text-primary leading-snug group-hover:text-secondary-container transition-colors line-clamp-2">
                            {task.title}
                          </h4>
                          <span className="text-[9px] font-bold text-[#006a61] block mt-1.5 uppercase tracking-wider truncate max-w-[170px]">
                            {task.project}
                          </span>
                        </div>

                        {/* Middle category tag */}
                        {task.categoryName && (
                          <div className="bg-surface-container-low px-2 py-1 rounded text-[10px] text-on-surface-variant font-medium">
                            📁 {task.categoryName}
                          </div>
                        )}

                        {/* Bottom assignee & reactive movement triggers */}
                        <div className="pt-3 border-t border-outline-variant/60 flex items-center justify-between">
                          <div className="flex items-center gap-2 min-w-0">
                            <img
                              src={task.assigneeAvatar}
                              alt={task.assigneeName}
                              referrerPolicy="no-referrer"
                              className="w-6 h-6 rounded-full object-cover border border-outline-variant shrink-0"
                            />
                            <span className="text-[11px] font-semibold text-primary truncate max-w-[80px]">
                              {task.assigneeName}
                            </span>
                          </div>

                          {/* Quick shifts buttons */}
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => moveTask(task, 'backward')}
                              disabled={task.status === 'To Do'}
                              className="p-1 text-outline hover:text-primary hover:bg-surface-container rounded transition-colors disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                              title="Migrate Ticket Left"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => moveTask(task, 'forward')}
                              disabled={task.status === 'Done'}
                              className="p-1 text-outline hover:text-primary hover:bg-surface-container rounded transition-colors disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                              title="Migrate Ticket Right"
                            >
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                      </motion.div>
                    ))}

                    {columnTasks.length === 0 && (
                      <div className="text-[11px] text-center font-medium text-on-surface-variant py-10 bg-white/20 rounded-lg border border-dashed border-outline-variant/60">
                        No active tickets under column.
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        ) : (
          
          /* RENDER B: ITERATIVE LIST VIEW */
          <motion.div
            key="list-rendering"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant bg-surface-container/30 text-[10px] font-extrabold uppercase tracking-widest text-outline">
                    <th className="px-6 py-3.5">Ticket Info</th>
                    <th className="px-6 py-3.5">Assigned Target System</th>
                    <th className="px-6 py-3.5">Priority</th>
                    <th className="px-6 py-3.5">Engineer Assignee</th>
                    <th className="px-6 py-3.5">Backlog Sprint</th>
                    <th className="px-6 py-3.5">Registry Status</th>
                    <th className="px-6 py-3.5 text-center">Status Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/60 font-sans text-xs">
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map(task => (
                      <tr key={task.id} className="hover:bg-surface-container-low/40 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-primary">{task.title}</div>
                          <div className="text-on-surface-variant text-[11px] font-medium mt-1">
                            📁 {task.categoryName}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-primary">
                          {task.project}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 py-1 px-2 rounded-full text-[10px] font-extrabold ${
                            task.priority === 'Blocker' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-surface-container text-primary'
                          }`}>
                            {renderPriorityIcon(task.priority)}
                            <span className="uppercase">{task.priority}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <img
                              src={task.assigneeAvatar}
                              alt={task.assigneeName}
                              referrerPolicy="no-referrer"
                              className="w-6 h-6 rounded-full object-cover border"
                            />
                            <span className="font-semibold text-primary">{task.assigneeName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-mono font-bold text-outline">
                          {task.sprint}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[11px] font-bold text-primary bg-surface-container px-2 py-1 rounded">
                            {task.status}
                          </span>
                        </td>
                        <td className="px-1 py-4 text-center">
                          {/* Dropdown status modifier */}
                          <select
                            value={task.status}
                            onChange={(e) => onUpdateTaskStatus(task.id, e.target.value as any)}
                            className="bg-white border border-outline-variant text-on-surface rounded text-[11px] font-bold px-2 py-1 focus:outline-none cursor-pointer"
                          >
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Review">In Review</option>
                            <option value="Done">Completed</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-sm font-semibold text-on-surface-variant">
                        No active tickets registered under search results.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Dynamic Ticket Assembly Dialog Popup */}
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

            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xl w-full max-w-[480px] overflow-hidden z-10 relative"
            >
              <div className="px-6 py-4 border-b border-outline-variant flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary">
                  <FolderKanban className="w-5 h-5 text-[#2d476f]" />
                  <h3 className="font-headline font-bold text-base">Assemble Sprint Ticket</h3>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-outline hover:text-primary p-1 rounded-full hover:bg-surface-container transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateTask} className="p-6 space-y-4 text-left">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                    Ticket Title Summarized
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Core Auth Endpoint optimization"
                    className="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant rounded text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                </div>

                {/* Scope target Project */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                    Associated Enterprise System Initiative
                  </label>
                  <select
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant rounded text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  >
                    <option value="">-- Choose Project Scope --</option>
                    {projects.map(p => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>

                {/* Sub category / subsystem */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                    Subsystem Division Name
                  </label>
                  <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="e.g. Systems Telemetry, GraphQL API, Auth Provider"
                    className="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant rounded text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                </div>

                {/* Grid assignment row */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Priority */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                      Target Priority
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant rounded text-on-surface text-xs focus:outline-none"
                    >
                      <option value="Blocker">⚠️ Blocker Class</option>
                      <option value="High">🔴 High Priority</option>
                      <option value="Medium">🔵 Medium</option>
                      <option value="Low">🟢 Low Priority</option>
                    </select>
                  </div>

                  {/* Assignee */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                      Assigned Engineer Specialist
                    </label>
                    <select
                      value={assigneeName}
                      onChange={(e) => setAssigneeName(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant rounded text-on-surface text-xs focus:outline-none"
                    >
                      <option value="">-- Choose Specialist --</option>
                      {consultants.map(c => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Starting Column status */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                    Starting Backlog Column
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant rounded text-on-surface text-xs focus:outline-none"
                  >
                    <option value="To Do">To Do Backlog</option>
                    <option value="In Progress">Active: In Progress</option>
                    <option value="Review">Active: Code Review</option>
                    <option value="Done">Fully Tested & Completed</option>
                  </select>
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
                    className="px-4.5 py-2 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded cursor-pointer shadow-sm active:scale-95"
                  >
                    Assemble Ticket
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
