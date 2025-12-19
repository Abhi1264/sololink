'use client';

import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { signOut } from '@/lib/auth/client';
import { useRouter } from 'next/navigation';

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleSignOut}
      className="w-full h-9 justify-start border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-sm"
    >
      <LogOut size={16} strokeWidth={1.5} className="mr-2" />
      Sign Out
    </Button>
  );
}
