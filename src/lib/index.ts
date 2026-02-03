export const ROUTE_PATHS = {
  DASHBOARD: '/',
  TASKS: '/tasks',
  CALENDAR: '/calendar',
  SETTINGS: '/settings',
  LOGIN: '/login',
  SIGNUP: '/signup',
} as const;

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
}

export type TaskType = 'reminder' | 'email' | 'calendar';

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: TaskStatus;
  type: TaskType;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export const PRIORITY_COLORS: Record<Priority, string> = {
  [Priority.LOW]: 'bg-muted text-muted-foreground border-transparent',
  [Priority.MEDIUM]: 'bg-primary/10 text-primary border-primary/20',
  [Priority.HIGH]: 'bg-accent text-accent-foreground border-accent/20',
  [Priority.URGENT]: 'bg-destructive/10 text-destructive border-destructive/20',
};

export const STATUS_COLORS: Record<TaskStatus, string> = {
  [TaskStatus.TODO]: 'bg-secondary text-secondary-foreground border-transparent',
  [TaskStatus.IN_PROGRESS]: 'bg-primary text-primary-foreground border-transparent',
  [TaskStatus.COMPLETED]: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
};

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: d.getFullYear() !== 2026 ? 'numeric' : undefined,
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

export function isOverdue(dueDate: string | Date, status: TaskStatus): boolean {
  if (status === TaskStatus.COMPLETED) return false;
  const d = typeof dueDate === 'string' ? new Date(dueDate) : dueDate;
  return d < new Date();
}

export function getPriorityLabel(priority: Priority): string {
  switch (priority) {
    case Priority.LOW:
      return 'Low';
    case Priority.MEDIUM:
      return 'Medium';
    case Priority.HIGH:
      return 'High';
    case Priority.URGENT:
      return 'Urgent';
    default:
      return 'Normal';
  }
}

export interface FilterOptions {
  status?: TaskStatus | 'all';
  priority?: Priority | 'all';
  type?: TaskType | 'all';
  search?: string;
  sortBy?: 'dueDate' | 'priority' | 'createdAt';
}
