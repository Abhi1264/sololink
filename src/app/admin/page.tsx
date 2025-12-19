import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getUserLinks } from "@/app/actions/links";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const links = await getUserLinks();
  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);

  return (
    <DashboardShell 
      user={session.user} 
      links={links}
      stats={{
        totalLinks: links.length,
        enabledLinks: links.filter(l => l.isEnabled).length,
        totalClicks,
      }}
    />
  );
}
