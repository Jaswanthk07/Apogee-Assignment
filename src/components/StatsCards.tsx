import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertCircle, LayoutList } from 'lucide-react';
import { Task, TaskStatus, isOverdue } from '@/lib/index';

interface StatsCardsProps {
  tasks: Task[];
}

interface MetricCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  colorClass: string;
  description: string;
  delay: number;
}

const MetricCard = ({ title, value, icon, colorClass, description, delay }: MetricCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        delay: delay * 0.1,
      }}
      whileHover={{ y: -4 }}
      className="relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="mt-2 text-3xl font-bold tracking-tight text-foreground">{value}</h3>
        </div>
        <div className={`rounded-lg p-3 ${colorClass}`}>
          {icon}
        </div>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        {description}
      </p>
      {/* Decorative rim light effect */}
      <div className="absolute inset-px rounded-[calc(var(--radius)-1px)] ring-1 ring-white/10 pointer-events-none" />
    </motion.div>
  );
};

export function StatsCards({ tasks }: StatsCardsProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === TaskStatus.COMPLETED).length,
    overdue: tasks.filter((t) => isOverdue(t.dueDate, t.status)).length,
    today: tasks.filter((t) => {
      const taskDate = new Date(t.dueDate);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() === today.getTime() && t.status !== TaskStatus.COMPLETED;
    }).length,
  };

  const metrics = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: <LayoutList className="h-5 w-5" />,
      colorClass: 'bg-primary/10 text-primary',
      description: 'Total items in your queue',
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: <CheckCircle className="h-5 w-5" />,
      colorClass: 'bg-emerald-500/10 text-emerald-600',
      description: 'Tasks successfully finished',
    },
    {
      title: 'Due Today',
      value: stats.today,
      icon: <Clock className="h-5 w-5" />,
      colorClass: 'bg-amber-500/10 text-amber-600',
      description: 'Pending tasks for today',
    },
    {
      title: 'Overdue',
      value: stats.overdue,
      icon: <AlertCircle className="h-5 w-5" />,
      colorClass: 'bg-destructive/10 text-destructive',
      description: 'Tasks past their deadline',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <MetricCard
          key={metric.title}
          {...metric}
          delay={index}
        />
      ))}
    </div>
  );
}
