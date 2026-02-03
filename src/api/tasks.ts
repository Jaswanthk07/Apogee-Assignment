import { apiClient } from './client';
import { Task, FilterOptions } from '@/lib/index';

export interface TasksResponse {
  success: boolean;
  count: number;
  tasks: Task[];
}

export interface TaskResponse {
  success: boolean;
  task: Task;
}

export interface SyncResponse {
  success: boolean;
  syncedTasks: Task[];
  conflicts: Array<{
    taskId: string;
    serverVersion: Task;
    clientVersion: Task;
  }>;
  serverTasks: Task[];
}

export const tasksApi = {
  getTasks: async (filters?: FilterOptions): Promise<Task[]> => {
    const params = new URLSearchParams();
    if (filters?.status && filters.status !== 'all') params.append('status', filters.status);
    if (filters?.priority && filters.priority !== 'all') params.append('priority', filters.priority);
    if (filters?.type && filters.type !== 'all') params.append('type', filters.type);
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);

    const { data } = await apiClient.get<TasksResponse>(`/tasks?${params.toString()}`);
    return data.tasks;
  },

  getTask: async (id: string): Promise<Task> => {
    const { data } = await apiClient.get<TaskResponse>(`/tasks/${id}`);
    return data.task;
  },

  createTask: async (taskData: Partial<Task>): Promise<Task> => {
    const { data } = await apiClient.post<TaskResponse>('/tasks', taskData);
    return data.task;
  },

  updateTask: async (id: string, updates: Partial<Task>): Promise<Task> => {
    const { data } = await apiClient.put<TaskResponse>(`/tasks/${id}`, updates);
    return data.task;
  },

  deleteTask: async (id: string): Promise<void> => {
    await apiClient.delete(`/tasks/${id}`);
  },

  syncTasks: async (localTasks: Task[]): Promise<SyncResponse> => {
    const { data } = await apiClient.post<SyncResponse>('/tasks/sync', {
      tasks: localTasks,
    });
    return data;
  },
};
