import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Zap 
} from 'lucide-react';
import { ROUTE_PATHS, Task } from '@/lib/index';
import { useTasks } from '@/hooks/useTasks';
import { StatsCards } from '@/components/StatsCards';
import { TaskCard } from '@/components/TaskCard';
import { IMAGES } from '@/assets/images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { springPresets, fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';

export default function Dashboard() {
  const navigate = useNavigate();
  const { tasks, isLoading, toggleComplete, deleteTask } = useTasks();

  // Filter recent tasks (limit to 4 for dashboard display)
  const recentTasks = React.useMemo(() => {
    return [...tasks]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 4);
  }, [tasks]);

  const handleEdit = (task: Task) => {
    navigate(ROUTE_PATHS.TASKS, { state: { editingTask: task } });
  };

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-primary/5 border border-border/50 h-[320px] flex items-center">
        <div className="hero-background">
          <img 
            src={IMAGES.HERO_BG_1} 
            alt="Productive Workspace" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="hero-overlay opacity-60" />
        
        <div className="relative z-10 px-8 md:px-12 w-full max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={springPresets.gentle}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3 h-3" />
                2026 Productivity Protocol
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              Master your day, <br />
              <span className="text-primary">one action at a time.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Welcome back. You have {tasks.filter(t => t.status !== 'completed').length} pending items that require your focus today.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate(ROUTE_PATHS.TASKS)}
                className="rounded-full px-8 shadow-lg shadow-primary/20"
              >
                <Plus className="mr-2 h-5 w-5" />
                New Task
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => navigate(ROUTE_PATHS.CALENDAR)}
                className="rounded-full px-8 bg-background/50 backdrop-blur-sm"
              >
                <CalendarIcon className="mr-2 h-5 w-5" />
                View Schedule
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Floating Abstract Element */}
        <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2">
          <motion.div
            animate={{ 
              y: [0, -20, 0], 
              rotate: [0, 5, 0] 
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-64 h-64 relative"
          >
             <img 
              src={IMAGES.TASK_ICON_1} 
              alt="Task Illustration" 
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section>
        <StatsCards tasks={tasks} />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Tasks List */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Recent Activity</h2>
            </div>
            <Link 
              to={ROUTE_PATHS.TASKS} 
              className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
            >
              View all tasks
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 rounded-2xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : recentTasks.length > 0 ? (
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid gap-4"
            >
              {recentTasks.map((task) => (
                <motion.div key={task.id} variants={staggerItem}>
                  <TaskCard
                    task={task}
                    onEdit={handleEdit}
                    onDelete={deleteTask}
                    onToggleComplete={toggleComplete}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <Card className="border-dashed bg-muted/30">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <div className="p-4 rounded-full bg-muted mb-4">
                  <CheckCircle2 className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">All caught up!</h3>
                <p className="text-muted-foreground max-w-xs">
                  You don't have any tasks right now. Start by creating a new action item.
                </p>
                <Button 
                  variant="link" 
                  className="mt-2"
                  onClick={() => navigate(ROUTE_PATHS.TASKS)}
                >
                  Create your first task
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar / Quick Actions */}
        <div className="space-y-8">
          <Card className="overflow-hidden border-none shadow-xl shadow-primary/5 bg-gradient-to-br from-primary/10 via-background to-background">
            <CardHeader>
              <CardTitle className="text-lg">Quick Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-border/50">
                <span className="text-sm font-medium text-muted-foreground">Active Emails</span>
                <span className="text-sm font-bold">{tasks.filter(t => t.type === 'email' && t.status !== 'completed').length}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-border/50">
                <span className="text-sm font-medium text-muted-foreground">Calendar Invites</span>
                <span className="text-sm font-bold">{tasks.filter(t => t.type === 'calendar' && t.status !== 'completed').length}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-border/50">
                <span className="text-sm font-medium text-muted-foreground">Reminders</span>
                <span className="text-sm font-bold">{tasks.filter(t => t.type === 'reminder' && t.status !== 'completed').length}</span>
              </div>
              <Button 
                variant="secondary" 
                className="w-full mt-2 rounded-xl"
                onClick={() => navigate(ROUTE_PATHS.SETTINGS)}
              >
                Manage Preferences
              </Button>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold">Pro Tip</h4>
                  <p className="text-xs text-muted-foreground">Sync tasks to offline storage to work without internet.</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full text-xs h-8"
                onClick={() => window.location.reload()}
              >
                Check Sync Status
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
