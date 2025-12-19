'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from '@/lib/auth/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Link2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await signIn.email({
        email,
        password,
        callbackURL: '/admin',
      });
      router.push('/admin');
    } catch (err) {
      setError('Invalid email or password');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 noise-bg flex items-center justify-center p-6">
      {/* Dot Pattern */}
      <div className="fixed inset-0 dot-pattern dark:dot-pattern-dark pointer-events-none opacity-50" />

      {/* Back to Home */}
      <Link 
        href="/" 
        className="fixed top-6 left-6 flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors z-10"
      >
        <Link2 size={20} strokeWidth={1.5} />
        <span className="text-sm font-medium">MonoLink</span>
      </Link>

      <Card className="w-full max-w-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm relative z-10">
        <div className="p-8 md:p-10 space-y-8">
          {/* Header */}
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-lg bg-neutral-900 dark:bg-neutral-50 flex items-center justify-center mb-4">
              <Link2 size={24} className="text-neutral-50 dark:text-neutral-900" strokeWidth={2} />
            </div>
            
            <div>
              <h1 className="text-2xl font-bold heading-tight mb-1">Sign In</h1>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Access your dashboard
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="h-10 border-neutral-200 dark:border-neutral-800 focus:border-neutral-900 dark:focus:border-neutral-50"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Link 
                  href="#" 
                  className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors"
                >
                  Forgot?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="h-10 border-neutral-200 dark:border-neutral-800 focus:border-neutral-900 dark:focus:border-neutral-50"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-10 bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-hover" 
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-neutral-400 border-t-neutral-50 rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign In
                  <ArrowRight size={16} />
                </span>
              )}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="pt-4 text-center text-sm border-t border-neutral-200 dark:border-neutral-800">
            <span className="text-neutral-600 dark:text-neutral-400">New to MonoLink? </span>
            <Link href="/signup" className="font-medium hover:underline">
              Create account
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
