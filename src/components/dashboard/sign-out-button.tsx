"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "@/lib/auth/client";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleSignOut}>
      <LogOut size={18} className="mr-2" />
      Sign Out
    </Button>
  );
}
