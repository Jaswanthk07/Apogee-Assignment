import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User as UserIcon,
  Bell,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  LogOut,
  Shield,
  Smartphone,
  Globe,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { taskStorage } from '@/lib/storage';
import { Task } from '@/lib/index';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { springPresets, fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';

export default function Settings() {
  const { user, updateProfile, logout } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [syncStatus, setSyncStatus] = useState<{ lastSynced: string; isOffline: boolean } | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    const checkSync = async () => {
      const status = await taskStorage.getSyncStatus();
      setSyncStatus(status);
    };
    checkSync();
  }, []);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email });
    toast.success('Profile updated successfully');
  };

  const handleExportData = async () => {
    setIsExporting(true);
    try {
      const tasks = await taskStorage.getAllTasks();
      const dataStr = JSON.stringify(tasks, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `action-items-export-2026-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Tasks exported successfully');
    } catch (error) {
      toast.error('Failed to export data');
    } finally {
      setIsExporting(false);
    }
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const content = event.target?.result as string;
        const importedTasks = JSON.parse(content) as Task[];
        
        if (Array.isArray(importedTasks)) {
          for (const task of importedTasks) {
            await taskStorage.updateTask(task);
          }
          toast.success(`${importedTasks.length} tasks imported successfully`);
          window.location.reload();
        } else {
          throw new Error('Invalid format');
        }
      } catch (error) {
        toast.error('Failed to import data. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetData = async () => {
    if (window.confirm('Are you sure you want to delete all tasks? This action cannot be undone.')) {
      setIsResetting(true);
      try {
        await taskStorage.clearAll();
        toast.success('All local data cleared');
        setTimeout(() => window.location.reload(), 1000);
      } catch (error) {
        toast.error('Failed to clear data');
      } finally {
        setIsResetting(false);
      }
    }
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto space-y-8 pb-12"
    >
      <motion.div variants={fadeInUp} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account preferences and data in 2026</p>
        </div>
        <Button variant="outline" onClick={logout} className="text-destructive hover:bg-destructive/10">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </motion.div>

      <div className="grid gap-8">
        {/* Profile Section */}
        <motion.section variants={staggerItem}>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-primary" />
                <CardTitle>Profile Information</CardTitle>
              </div>
              <CardDescription>Update your personal details and how others see you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleUpdateProfile} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Display Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                  />
                </div>
                <Button type="submit" className="w-fit">Save Changes</Button>
              </form>
            </CardContent>
          </Card>
        </motion.section>

        {/* Notifications & Preferences */}
        <motion.section variants={staggerItem}>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <CardTitle>Notifications</CardTitle>
              </div>
              <CardDescription>Configure how you receive alerts and reminders.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive daily summaries of your tasks.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Get real-time alerts on your desktop.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Overdue Reminders</Label>
                  <p className="text-sm text-muted-foreground">Notify me immediately when a task is overdue.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Sync & Connectivity */}
        <motion.section variants={staggerItem}>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-primary" />
                <CardTitle>Offline & Sync</CardTitle>
              </div>
              <CardDescription>Monitor your local storage and synchronization status.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
                <div className="flex items-center gap-3">
                  {syncStatus?.isOffline ? (
                    <div className="p-2 rounded-full bg-amber-500/10">
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                    </div>
                  ) : (
                    <div className="p-2 rounded-full bg-emerald-500/10">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium">
                      {syncStatus?.isOffline ? 'Offline Mode' : 'Online & Synced'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Last synced: {syncStatus ? new Date(syncStatus.lastSynced).toLocaleString() : 'Never'}
                    </p>
                  </div>
                </div>
                <Badge variant={syncStatus?.isOffline ? 'outline' : 'secondary'}>
                  {syncStatus?.isOffline ? 'LocalStorage Active' : 'Cloud Sync Active'}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-3 border rounded-md border-border/50 flex items-center gap-3">
                  <Smartphone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Mobile App Linked</span>
                </div>
                <div className="p-3 border rounded-md border-border/50 flex items-center gap-3">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">API Access Enabled</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Data Management */}
        <motion.section variants={staggerItem}>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle>Data Management</CardTitle>
              </div>
              <CardDescription>Export, import, or permanently delete your task history.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="outline"
                  onClick={handleExportData}
                  disabled={isExporting}
                  className="flex-1"
                >
                  <Download className="mr-2 h-4 w-4" />
                  {isExporting ? 'Exporting...' : 'Export JSON'}
                </Button>
                
                <div className="relative flex-1">
                  <Input
                    type="file"
                    accept=".json"
                    onChange={handleImportData}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                  <Button variant="outline" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Import JSON
                  </Button>
                </div>
              </div>

              <div className="pt-6 border-t border-border/50">
                <div className="p-4 rounded-lg border border-destructive/20 bg-destructive/5 space-y-3">
                  <div>
                    <h4 className="font-semibold text-destructive flex items-center gap-2">
                      <Trash2 className="h-4 w-4" />
                      Danger Zone
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Permanently delete all your local tasks and settings. This cannot be undone.
                    </p>
                  </div>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={handleResetData}
                    disabled={isResetting}
                  >
                    {isResetting ? 'Clearing...' : 'Reset All Data'}
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="text-center justify-center border-t border-border/50 py-4">
              <p className="text-xs text-muted-foreground">
                Action Items Manager &copy; 2026 • v2.4.0-kinetic
              </p>
            </CardFooter>
          </Card>
        </motion.section>
      </div>
    </motion.div>
  );
}
