import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link2, GripVertical, BarChart3, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link2 size={28} className="text-primary" />
            <span className="text-xl font-bold">MonoLink</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4">
        <section className="py-20 text-center">
          <h1 className="text-5xl font-bold mb-6">One Link for Everything</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Share your content, portfolio, and social links with a single,
            customizable page
          </p>
          <Link href="/signup">
            <Button size="lg">
              Create Your Link
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
        </section>

        <section className="py-16">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6">
              <div className="mb-4">
                <Link2 size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Custom Links</h3>
              <p className="text-muted-foreground">
                Add unlimited links to your profile. Each link is trackable and
                customizable.
              </p>
            </Card>

            <Card className="p-6">
              <div className="mb-4">
                <GripVertical size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Drag & Drop</h3>
              <p className="text-muted-foreground">
                Easily reorder your links with simple drag and drop. No
                technical skills needed.
              </p>
            </Card>

            <Card className="p-6">
              <div className="mb-4">
                <BarChart3 size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Analytics</h3>
              <p className="text-muted-foreground">
                See how many people click on each link. Understand your audience
                better.
              </p>
            </Card>
          </div>
        </section>

        <section className="py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Started in Seconds</h2>
          <p className="text-muted-foreground mb-8">
            Create your account and start sharing your links
          </p>
          <Link href="/signup">
            <Button size="lg">Sign Up Now</Button>
          </Link>
        </section>
      </main>

      <footer className="border-t py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 MonoLink. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
