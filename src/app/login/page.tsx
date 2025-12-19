import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { LoginForm } from '@/components/auth/login-form';

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Redirect to admin if already logged in
  if (session?.user) {
    redirect('/admin');
  }

  return <LoginForm />;
}
