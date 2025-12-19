import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getUserLinks } from "@/app/actions/links";
import { LinkList } from "@/components/dashboard/link-list";
import { CreateLinkForm } from "@/components/dashboard/create-link-form";
import { Link2 } from "lucide-react";
import { SignOutButton } from "@/components/dashboard/sign-out-button";
import { Card } from "@/components/ui/card";

export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const links = await getUserLinks();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link2 size={24} className="text-primary" />
            <h1 className="text-xl font-bold">MonoLink Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`${process.env.NEXT_PUBLIC_APP_URL}/${session.user.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              View Profile
            </a>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <Card className="p-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">
                Welcome, {session.user.name}!
              </h2>
              <p className="text-muted-foreground">
                Your profile is live at:{" "}
                <a
                  href={`${process.env.NEXT_PUBLIC_APP_URL}/${session.user.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {session.user.name}.{process.env.NEXT_PUBLIC_ROOT_DOMAIN}
                </a>
              </p>
            </div>
          </Card>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Your Links</h2>
            <CreateLinkForm />
            {links.length > 0 ? (
              <LinkList initialLinks={links} />
            ) : (
              <Card className="p-8 text-center text-muted-foreground">
                No links yet. Create your first link above!
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
