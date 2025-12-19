"use client";

import { Link as LinkType } from "@/lib/db/schema";
import { ArrowUpRight } from "lucide-react";

interface ProfileLinkProps {
  link: LinkType;
}

export function ProfileLink({ link }: ProfileLinkProps) {
  const handleClick = () => {
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify({ linkId: link.id })], {
        type: "application/json",
      });
      navigator.sendBeacon("/api/track-click", blob);
    } else {
      fetch("/api/track-click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ linkId: link.id }),
        keepalive: true,
      }).catch(() => {});
    }
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="block w-full p-4 rounded-lg border bg-card hover:bg-accent transition-colors group"
    >
      <div className="flex items-center justify-between">
        <span className="font-medium group-hover:text-primary transition-colors">
          {link.title}
        </span>
        <ArrowUpRight
          size={20}
          className="text-muted-foreground group-hover:text-primary transition-colors"
        />
      </div>
    </a>
  );
}
