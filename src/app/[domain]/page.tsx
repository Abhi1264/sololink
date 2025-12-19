import { db } from "@/lib/db";
import { user, links } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ProfileLink } from "@/components/profile/profile-link";
import { Metadata } from "next";
import Image from "next/image";

interface PageProps {
  params: Promise<{ domain: string }>;
}

async function getUserWithLinks(username: string) {
  const [foundUser] = await db
    .select()
    .from(user)
    .where(eq(user.name, username))
    .limit(1);

  if (!foundUser) return null;

  const userLinks = await db
    .select()
    .from(links)
    .where(eq(links.userId, foundUser.id))
    .orderBy(links.order);

  return {
    user: foundUser,
    links: userLinks.filter((link) => link.isEnabled),
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { domain } = await params;
  const data = await getUserWithLinks(domain);

  if (!data) {
    return {
      title: "User Not Found",
    };
  }

  return {
    title: `${data.user.name} | MonoLink`,
    description: `Check out ${data.user.name}'s links`,
    openGraph: {
      title: `${data.user.name} | MonoLink`,
      description: `Check out ${data.user.name}'s links`,
      images: data.user.image ? [{ url: data.user.image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.user.name} | MonoLink`,
      description: `Check out ${data.user.name}'s links`,
      images: data.user.image ? [data.user.image] : [],
    },
  };
}

export default async function ProfilePage({ params }: PageProps) {
  const { domain } = await params;
  const data = await getUserWithLinks(domain);

  if (!data) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <div className="container max-w-2xl mx-auto px-4 py-16">
        <div className="flex flex-col items-center space-y-8">
          {data.user.image && (
            <div className="relative w-24 h-24">
              <Image
                src={data.user.image}
                alt={data.user.name}
                width={96}
                height={96}
                className="rounded-full object-cover border-4 border-background shadow-lg"
              />
            </div>
          )}

          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">@{data.user.name}</h1>
            <p className="text-muted-foreground">
              {data.links.length} {data.links.length === 1 ? "link" : "links"}
            </p>
          </div>

          <div className="w-full space-y-4">
            {data.links.length > 0 ? (
              data.links.map((link) => (
                <ProfileLink key={link.id} link={link} />
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No links available yet
              </div>
            )}
          </div>

          <footer className="text-center text-sm text-muted-foreground mt-12">
            <p>
              Powered by{" "}
              <a
                href={process.env.NEXT_PUBLIC_APP_URL}
                className="text-primary hover:underline"
              >
                MonoLink
              </a>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
