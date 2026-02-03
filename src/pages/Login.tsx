import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { ROUTE_PATHS } from '@/lib/index';
import { IMAGES } from '@/assets/images';
import { springPresets, fadeInUp, hoverLift } from '@/lib/motion';

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid work email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

/**
 * Login Page Component
 * Features a modern 2026 Kinetic Productivity design with glassmorphism,
 * physical elevation effects, and spring-based animations.
 */
export default function Login() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTE_PATHS.DASHBOARD);
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Background Image with Neo-minimalist Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.HERO_BG_2}
          alt="Workspace Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/50 to-primary/10" />
      </div>

      {/* Decorative localized glow for 'Physicality' */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={springPresets.gentle}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="border-white/10 bg-card/60 backdrop-blur-xl shadow-2xl ring-1 ring-white/10 overflow-hidden">
          <CardHeader className="space-y-1 pb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <CheckCircle2 className="text-primary-foreground w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tighter">ActionFlow</span>
            </div>
            <CardTitle className="text-3xl font-bold">Welcome back</CardTitle>
            <CardDescription className="text-muted-foreground text-base">
              Enter your credentials to manage your 2026 action items
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    className="pl-10 bg-background/50 border-white/10 focus:ring-primary/50"
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs font-medium text-destructive mt-1">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button type="button" className="text-xs text-primary hover:underline font-medium">
                    Forgot password?
                  </button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 bg-background/50 border-white/10 focus:ring-primary/50"
                    {...register('password')}
                  />
                </div>
                {errors.password && (
                  <p className="text-xs font-medium text-destructive mt-1">{errors.password.message}</p>
                )}
              </div>

              <motion.div
                initial="rest"
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                variants={hoverLift}
              >
                <Button
                  type="submit"
                  className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      <span>Authenticating...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
              </motion.div>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 border-t border-white/5 pt-6 mt-2">
            <div className="text-sm text-center text-muted-foreground">
              Don't have an account?{' '}
              <Link to={ROUTE_PATHS.SIGNUP} className="text-primary font-semibold hover:underline">
                Create account
              </Link>
            </div>
          </CardFooter>
        </Card>

        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-muted-foreground/60">
          <p>© 2026 ActionFlow Inc.</p>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
          <p>Privacy Policy</p>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
          <p>Terms of Service</p>
        </div>
      </motion.div>
    </div>
  );
}