'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from '@/lib/auth/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Link2, ArrowRight, Check, X } from 'lucide-react';
import Link from 'next/link';

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const passwordRequirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains a number', met: /\d/.test(password) },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      setIsLoading(false);
      return;
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      setError('Username can only contain letters, numbers, dashes, and underscores');
      setIsLoading(false);
      return;
    }

    try {
      await signUp.email({
        email,
        password,
        name: username,
        callbackURL: '/admin',
      });
      router.push('/admin');
    } catch (err) {
      setError('Failed to create account. Username or email may already exist.');
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
              <h1 className="text-2xl font-bold heading-tight mb-1">Create Account</h1>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Get started with MonoLink
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
              <Label htmlFor="username" className="text-sm font-medium">
                Username
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">@</span>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase())}
                  placeholder="johndoe"
                  required
                  className="h-10 pl-8 border-neutral-200 dark:border-neutral-800 focus:border-neutral-900 dark:focus:border-neutral-50"
                />
              </div>
              <p className="text-xs mono-meta text-neutral-500">
                {username || 'username'}.monolink.app
              </p>
            </div>

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
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={8}
                className="h-10 border-neutral-200 dark:border-neutral-800 focus:border-neutral-900 dark:focus:border-neutral-50"
              />
              
              {/* Password Requirements */}
              {password && (
                <div className="space-y-1.5 pt-2">
                  {passwordRequirements.map((req) => (
                    <div key={req.label} className="flex items-center gap-2 text-xs">
                      {req.met ? (
                        <Check size={12} className="text-green-600" strokeWidth={2} />
                      ) : (
                        <X size={12} className="text-neutral-400" strokeWidth={2} />
                      )}
                      <span className={req.met ? 'text-neutral-600 dark:text-neutral-400' : 'text-neutral-500'}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full h-10 bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-hover" 
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-neutral-400 border-t-neutral-50 rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Create Account
                  <ArrowRight size={16} />
                </span>
              )}
            </Button>
          </form>

          {/* Sign In Link */}
          <div className="pt-4 text-center text-sm border-t border-neutral-200 dark:border-neutral-800">
            <span className="text-neutral-600 dark:text-neutral-400">Already have an account? </span>
            <Link href="/login" className="font-medium hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
