import React from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Mail,
  Bell,
  CheckCircle2,
  Circle,
  Trash2,
  Edit3,
  AlertTriangle,
  Clock
} from 'lucide-react';
import {
  Task,
  Priority,
  TaskStatus,
  PRIORITY_COLORS,
  STATUS_COLORS,
  formatDate,
  isOverdue,
  getPriorityLabel
} from '@/lib/index';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export function TaskCard({ task, onEdit, onDelete, onToggleComplete }: TaskCardProps) {
  const overdue = isOverdue(task.dueDate, task.status);
  const isCompleted = task.status === TaskStatus.COMPLETED;

  const TypeIcon = {
    email: Mail,
    reminder: Bell,
    calendar: Calendar,
  }[task.type] || Bell;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={cn(
        "relative overflow-hidden border-border bg-card transition-all duration-300 ring-1 ring-white/5",
        isCompleted ? "opacity-75 grayscale-[0.2]" : "hover:shadow-lg hover:shadow-primary/5"
      )}>
        {/* Priority Accent Bar */}
        <div className={cn(
          "absolute top-0 left-0 w-1 h-full",
          task.priority === Priority.URGENT ? "bg-destructive" : 
          task.priority === Priority.HIGH ? "bg-accent" : 
          task.priority === Priority.MEDIUM ? "bg-primary" : "bg-muted"
        )} />

        <div className="p-5 flex flex-col gap-4">
          {/* Header: Type & Priority */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="p-1.5 rounded-md bg-secondary">
                <TypeIcon className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider">{task.type}</span>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0 font-mono", PRIORITY_COLORS[task.priority])}>
                {getPriorityLabel(task.priority)}
              </Badge>
              <div className="flex items-center gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-primary"
                        onClick={() => onEdit(task)}
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Edit Task</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-destructive"
                        onClick={() => onDelete(task.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete Task</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>

          {/* Body: Title & Description */}
          <div className="flex-1">
            <h3 className={cn(
              "text-base font-semibold transition-all",
              isCompleted ? "line-through text-muted-foreground" : "text-foreground"
            )}>
              {task.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {task.description}
            </p>
          </div>

          {/* Footer: Date & Status */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex flex-col gap-1">
              <div className={cn(
                "flex items-center gap-1.5 text-xs font-medium",
                overdue ? "text-destructive animate-pulse" : "text-muted-foreground"
              )}>
                {overdue ? <AlertTriangle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                <span>{formatDate(task.dueDate)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="secondary" className={cn("text-[10px]", STATUS_COLORS[task.status])}>
                {task.status.replace('-', ' ')}
              </Badge>
              
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 px-2 flex items-center gap-2 transition-colors",
                  isCompleted ? "text-emerald-600 hover:text-emerald-700" : "text-primary hover:text-primary/80"
                )}
                onClick={() => onToggleComplete(task.id)}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 fill-emerald-500/10" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
                <span className="text-xs font-semibold">
                  {isCompleted ? 'Completed' : 'Mark Done'}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
