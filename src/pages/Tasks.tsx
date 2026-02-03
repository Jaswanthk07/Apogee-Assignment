import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ClipboardList, AlertCircle, Loader2 } from 'lucide-react';
import { 
  Task, 
  Priority, 
  TaskStatus, 
  FilterOptions 
} from '@/lib/index';
import { useTasks } from '@/hooks/useTasks';
import { FilterBar } from '@/components/FilterBar';
import { TaskCard } from '@/components/TaskCard';
import { TaskForm } from '@/components/TaskForm';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { springPresets, fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';

const TasksPage: React.FC = () => {
  const {
    filteredTasks,
    isLoading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete,
    setFilters,
  } = useTasks();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  const handleCreateNew = () => {
    setEditingTask(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleSubmit = async (taskData: Partial<Task>) => {
    if (editingTask) {
      await updateTask(editingTask.id, taskData);
    } else {
      await createTask(taskData);
    }
    setIsFormOpen(false);
  };

  const handleFilterChange = (filters: FilterOptions) => {
    setFilters(filters);
  };

  const handleSearchChange = (search: string) => {
    setFilters({ search });
  };

  return (
    <div className="flex flex-col h-full space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={springPresets.gentle}
        >
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Action Items
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your reminders, emails, and calendar invites for 2026.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={springPresets.gentle}
        >
          <Button 
            onClick={handleCreateNew} 
            className="shadow-lg hover:shadow-primary/25 transition-all active:scale-95"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Action Item
          </Button>
        </motion.div>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, ...springPresets.gentle }}
        className="z-10"
      >
        <FilterBar 
          onFilterChange={handleFilterChange} 
          onSearchChange={handleSearchChange} 
        />
      </motion.div>

      <ScrollArea className="flex-1 -mx-4 px-4">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-xl" />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
            <div className="bg-destructive/10 p-4 rounded-full">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Failed to load tasks</h3>
              <p className="text-muted-foreground">{error.message}</p>
            </div>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96 text-center space-y-4">
            <div className="bg-muted p-6 rounded-full">
              <ClipboardList className="h-12 w-12 text-muted-foreground/50" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">No action items found</h3>
              <p className="text-muted-foreground max-w-xs mx-auto">
                Try adjusting your filters or create a new task to get started with your productivity.
              </p>
            </div>
            <Button variant="secondary" onClick={handleCreateNew}>
              Create Your First Item
            </Button>
          </div>
        ) : (
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredTasks.map((task) => (
                <motion.div
                  key={task.id}
                  variants={staggerItem}
                  layout
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={springPresets.snappy}
                >
                  <TaskCard
                    task={task}
                    onEdit={handleEdit}
                    onDelete={deleteTask}
                    onToggleComplete={toggleComplete}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </ScrollArea>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[500px] border-none shadow-2xl overflow-hidden p-0">
          <div className="bg-gradient-to-br from-primary/5 to-transparent">
            <DialogHeader className="p-6 pb-2">
              <DialogTitle className="text-2xl font-bold">
                {editingTask ? 'Edit Action Item' : 'New Action Item'}
              </DialogTitle>
            </DialogHeader>
            <div className="p-6">
              <TaskForm 
                task={editingTask}
                onSubmit={handleSubmit}
                onCancel={() => setIsFormOpen(false)}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TasksPage;
