import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { SignUpForm } from '@/components/auth/signup-form';

export default async function SignUpPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Redirect to admin if already logged in
  if (session?.user) {
    redirect('/admin');
  }

  return <SignUpForm />;
}
