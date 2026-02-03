import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Plus, 
  Clock,
  LayoutGrid,
  List,
  MoreHorizontal
} from 'lucide-react';
import { 
  Task, 
  Priority, 
  TaskStatus, 
  PRIORITY_COLORS, 
  formatDate, 
  isOverdue 
} from '@/lib/index';
import { useTasks } from '@/hooks/useTasks';
import { TaskCard } from '@/components/TaskCard';
import { IMAGES } from '@/assets/images';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Calendar() {
  const { tasks, deleteTask, toggleComplete, updateTask } = useTasks();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 3)); // Default to Feb 2026 based on system time
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2026, 1, 3));
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

  // Calendar Logic
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const calendarDays = useMemo(() => {
    const days = [];
    // Padding from previous month
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({ 
        date: new Date(year, month - 1, prevMonthLastDay - i), 
        currentMonth: false 
      });
    }
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ 
        date: new Date(year, month, i), 
        currentMonth: true 
      });
    }
    // Padding for next month
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ 
        date: new Date(year, month + 1, i), 
        currentMonth: false 
      });
    }
    return days;
  }, [year, month, daysInMonth, firstDayOfMonth]);

  const tasksForSelectedDate = useMemo(() => {
    if (!selectedDate) return [];
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return (
        taskDate.getDate() === selectedDate.getDate() &&
        taskDate.getMonth() === selectedDate.getMonth() &&
        taskDate.getFullYear() === selectedDate.getFullYear()
      );
    });
  }, [tasks, selectedDate]);

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const handleToday = () => {
    const today = new Date(2026, 1, 3);
    setCurrentDate(today);
    setSelectedDate(today);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Hero Header */}
      <div className="relative h-48 w-full overflow-hidden rounded-b-3xl">
        <img 
          src={IMAGES.CALENDAR_BG_1} 
          alt="Calendar Background" 
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/90" />
        <div className="relative z-10 flex h-full items-end p-8">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-2 text-primary ring-1 ring-primary/20">
                <CalendarIcon className="h-6 w-6" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Schedule</h1>
            </div>
            <p className="text-muted-foreground">Manage your deadlines and events for {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 flex-1 overflow-hidden">
        {/* Main Calendar Section */}
        <div className="lg:col-span-8 flex flex-col gap-4 overflow-hidden">
          <Card className="p-4 border-border shadow-sm flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleToday} className="font-medium">Today</Button>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" onClick={handlePrevMonth}><ChevronLeft className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={handleNextMonth}><ChevronRight className="h-4 w-4" /></Button>
                </div>
                <h2 className="text-lg font-semibold ml-2">
                  {currentDate.toLocaleString('default', { month: 'long' })} {year}
                </h2>
              </div>

              <div className="flex bg-muted rounded-lg p-1">
                <Button 
                  variant={viewMode === 'month' ? 'secondary' : 'ghost'} 
                  size="sm" 
                  className="text-xs h-8 px-3" 
                  onClick={() => setViewMode('month')}
                >
                  <LayoutGrid className="h-3 w-3 mr-2" />
                  Month
                </Button>
                <Button 
                  variant={viewMode === 'week' ? 'secondary' : 'ghost'} 
                  size="sm" 
                  className="text-xs h-8 px-3" 
                  onClick={() => setViewMode('week')}
                >
                  <List className="h-3 w-3 mr-2" />
                  Week
                </Button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="flex-1 overflow-auto">
              <div className="grid grid-cols-7 gap-px bg-border border rounded-xl overflow-hidden">
                {WEEKDAYS.map(day => (
                  <div key={day} className="bg-muted/50 p-3 text-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {day}
                  </div>
                ))}
                
                {calendarDays.map((dayObj, idx) => {
                  const dateTasks = getTasksForDate(dayObj.date);
                  const isSelected = selectedDate?.toDateString() === dayObj.date.toDateString();
                  const isToday = dayObj.date.toDateString() === new Date(2026, 1, 3).toDateString();

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.005 }}
                      onClick={() => setSelectedDate(dayObj.date)}
                      className={cn(
                        "min-h-[100px] p-2 bg-card cursor-pointer transition-all hover:bg-accent/5",
                        !dayObj.currentMonth && "opacity-40",
                        isSelected && "ring-2 ring-inset ring-primary z-10",
                        isToday && "bg-primary/5"
                      )}
                    >
                      <div className="flex justify-between items-start">
                        <span className={cn(
                          "text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full",
                          isToday ? "bg-primary text-primary-foreground" : "text-foreground"
                        )}>
                          {dayObj.date.getDate()}
                        </span>
                        {dateTasks.length > 0 && (
                          <span className="text-[10px] text-muted-foreground font-mono">
                            {dateTasks.length} {dateTasks.length === 1 ? 'task' : 'tasks'}
                          </span>
                        )}
                      </div>

                      <div className="mt-2 flex flex-col gap-1">
                        {dateTasks.slice(0, 2).map(task => (
                          <div 
                            key={task.id} 
                            className="text-[10px] truncate px-1.5 py-0.5 rounded-sm border flex items-center gap-1"
                            style={{
                              backgroundColor: 'var(--accent)',
                              borderColor: 'var(--border)',
                              color: 'var(--accent-foreground)'
                            }}
                          >
                            <div className={cn("w-1 h-1 rounded-full", 
                              task.priority === Priority.URGENT ? "bg-destructive" : 
                              task.priority === Priority.HIGH ? "bg-accent" : "bg-primary"
                            )} />
                            {task.title}
                          </div>
                        ))}
                        {dateTasks.length > 2 && (
                          <div className="text-[9px] text-muted-foreground pl-1">
                            + {dateTasks.length - 2} more
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>

        {/* Details Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-4 overflow-hidden">
          <Card className="p-6 border-border shadow-sm flex flex-col h-full bg-secondary/30">
            <div className="flex items-center justify-between mb-6">
              <div className="flex flex-col">
                <h3 className="text-lg font-bold">
                  {selectedDate ? selectedDate.toLocaleDateString('default', { weekday: 'long' }) : 'Select a date'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {selectedDate ? selectedDate.toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}
                </p>
              </div>
              <Button size="icon" variant="ghost" className="rounded-full">
                <Plus className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
              <AnimatePresence mode="wait">
                {tasksForSelectedDate.length > 0 ? (
                  <motion.div
                    key="list"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    {tasksForSelectedDate.map(task => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={(t) => console.log('Edit', t)}
                        onDelete={deleteTask}
                        onToggleComplete={toggleComplete}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="rounded-full bg-muted p-4 mb-4">
                      <Clock className="h-8 w-8 text-muted-foreground opacity-50" />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">No tasks scheduled for this day</p>
                    <p className="text-xs text-muted-foreground mt-1">Enjoy your free time or add a new reminder.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {selectedDate && (
              <div className="mt-6 pt-6 border-t border-border/50">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <span>DAILY SUMMARY</span>
                  <span>{tasksForSelectedDate.filter(t => t.status === TaskStatus.COMPLETED).length}/{tasksForSelectedDate.length} Done</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(tasksForSelectedDate.filter(t => t.status === TaskStatus.COMPLETED).length / (tasksForSelectedDate.length || 1)) * 100}%` }}
                    className="bg-primary h-full rounded-full transition-all"
                  />
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
