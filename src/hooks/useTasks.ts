import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Task,
  Priority,
  TaskStatus,
  FilterOptions,
  TaskType,
} from '@/lib/index';
import { taskStorage } from '@/lib/storage';
import { tasksApi } from '@/api/tasks';
import { toast } from 'sonner';

const PRIORITY_WEIGHTS: Record<Priority, number> = {
  [Priority.URGENT]: 4,
  [Priority.HIGH]: 3,
  [Priority.MEDIUM]: 2,
  [Priority.LOW]: 1,
};

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [filters, setFilters] = useState<FilterOptions>({
    status: 'all',
    priority: 'all',
    type: 'all',
    search: '',
    sortBy: 'dueDate',
  });

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success('Back online - syncing tasks...');
      syncWithServer();
    };
    const handleOffline = () => {
      setIsOnline(false);
      toast.warning('You are offline - changes will sync when reconnected');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const syncWithServer = useCallback(async () => {
    if (!isOnline) return;

    try {
      const localTasks = await taskStorage.getAllTasks();
      const response = await tasksApi.syncTasks(localTasks);

      // Update local storage with server tasks
      await taskStorage.clearAll();
      for (const task of response.serverTasks) {
        await taskStorage.addTask(task);
      }

      setTasks(response.serverTasks);

      if (response.conflicts.length > 0) {
        toast.warning(`${response.conflicts.length} conflicts detected - using server version`);
      }
    } catch (err) {
      console.error('Sync failed:', err);
    }
  }, [isOnline]);

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      
      if (isOnline) {
        // Fetch from server
        const serverTasks = await tasksApi.getTasks(filters);
        setTasks(serverTasks);
        
        // Update local cache
        await taskStorage.clearAll();
        for (const task of serverTasks) {
          await taskStorage.addTask(task);
        }
      } else {
        // Fetch from local storage when offline
        const localTasks = await taskStorage.getAllTasks();
        setTasks(localTasks);
      }
      
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch tasks'));
      
      // Fallback to local storage on error
      try {
        const localTasks = await taskStorage.getAllTasks();
        setTasks(localTasks);
      } catch (localErr) {
        console.error('Failed to load local tasks:', localErr);
      }
    } finally {
      setIsLoading(false);
    }
  }, [filters, isOnline]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        const matchesStatus =
          filters.status === 'all' || task.status === filters.status;
        const matchesPriority =
          filters.priority === 'all' || task.priority === filters.priority;
        const matchesType =
          filters.type === 'all' || task.type === filters.type;
        const matchesSearch =
          !filters.search ||
          task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          task.description.toLowerCase().includes(filters.search.toLowerCase());

        return matchesStatus && matchesPriority && matchesType && matchesSearch;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'dueDate') {
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }
        if (filters.sortBy === 'priority') {
          return PRIORITY_WEIGHTS[b.priority] - PRIORITY_WEIGHTS[a.priority];
        }
        if (filters.sortBy === 'createdAt') {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
        return 0;
      });
  }, [tasks, filters]);

  const createTask = async (taskData: Partial<Task>) => {
    try {
      if (isOnline) {
        const newTask = await tasksApi.createTask(taskData);
        await taskStorage.addTask(newTask);
        setTasks((prev) => [...prev, newTask]);
        toast.success('Task created successfully');
      } else {
        // Create locally when offline
        const now = new Date().toISOString();
        const newTask: Task = {
          id: crypto.randomUUID(),
          title: taskData.title || 'Untitled Task',
          description: taskData.description || '',
          priority: taskData.priority || Priority.MEDIUM,
          status: taskData.status || TaskStatus.TODO,
          type: taskData.type || 'reminder',
          dueDate: taskData.dueDate || now,
          createdAt: now,
          updatedAt: now,
          userId: 'offline-user',
        };

        await taskStorage.addTask(newTask);
        setTasks((prev) => [...prev, newTask]);
        toast.success('Task saved locally - will sync when online');
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create task'));
      toast.error('Failed to create task');
      throw err;
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      if (isOnline) {
        const updatedTask = await tasksApi.updateTask(id, updates);
        await taskStorage.updateTask(updatedTask);
        setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
        toast.success('Task updated successfully');
      } else {
        // Update locally when offline
        const existingTask = tasks.find((t) => t.id === id);
        if (!existingTask) throw new Error('Task not found');

        const updatedTask: Task = {
          ...existingTask,
          ...updates,
          updatedAt: new Date().toISOString(),
        };

        await taskStorage.updateTask(updatedTask);
        setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
        toast.success('Task updated locally - will sync when online');
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update task'));
      toast.error('Failed to update task');
      throw err;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      if (isOnline) {
        await tasksApi.deleteTask(id);
        await taskStorage.deleteTask(id);
        setTasks((prev) => prev.filter((t) => t.id !== id));
        toast.success('Task deleted successfully');
      } else {
        // Delete locally when offline
        await taskStorage.deleteTask(id);
        setTasks((prev) => prev.filter((t) => t.id !== id));
        toast.success('Task deleted locally - will sync when online');
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete task'));
      toast.error('Failed to delete task');
      throw err;
    }
  };

  const toggleComplete = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const newStatus =
      task.status === TaskStatus.COMPLETED
        ? TaskStatus.TODO
        : TaskStatus.COMPLETED;

    await updateTask(id, { status: newStatus });
  };

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return {
    tasks,
    filteredTasks,
    isLoading,
    error,
    filters,
    isOnline,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete,
    setFilters: updateFilters,
    refresh: fetchTasks,
    syncWithServer,
  };
}
