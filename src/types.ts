/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Invoice {
  id: string;
  client: string;
  project: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
}

export interface Milestone {
  id: string;
  date: string;
  title: string;
  description: string;
  status: 'Completed' | 'In Progress' | 'Planned';
}

export interface ProjectDoc {
  id: string;
  title: string;
  type: string;
  modifiedAt: string;
  size: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'On Track' | 'At Risk' | 'Active' | 'Planned';
  category: 'Cloud & Infrastructure' | 'AI/ML Initiatives' | 'Cybersecurity' | 'Data Analytics';
  overallProgress: number;
  startDate: string;
  endDate: string;
  spentToDate: number;
  leadConsultantName: string;
  leadConsultantRole: string;
  leadConsultantImg: string;
  illustrationType: 'globe' | 'ai' | 'shield' | 'database' | 'iot';
  milestones?: Milestone[];
  documents?: ProjectDoc[];
}

export interface Consultant {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  reviews: number;
  skills: string[];
  status: 'Available' | 'On Project' | 'Out of Office';
}

export interface Task {
  id: string;
  title: string;
  project: string;
  assigneeName: string;
  assigneeAvatar: string;
  priority: 'Blocker' | 'High' | 'Medium' | 'Low';
  status: 'To Do' | 'In Progress' | 'Review' | 'Done';
  sprint: string;
  categoryName?: string;
}

export interface KnowledgeDoc {
  id: string;
  title: string;
  category: 'DevOps' | 'Security' | 'Strategy' | 'Frontend' | 'Documentation' | 'Playbook' | 'Standards';
  summary: string;
  views: number;
  readTime: string;
  updatedAt: string;
  authorName: string;
  authorAvatar: string;
  imageUrl: string;
}

export interface Inquiry {
  fullName: string;
  businessEmail: string;
  company: string;
  serviceInterest: string;
  message: string;
}
