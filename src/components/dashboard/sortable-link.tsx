"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Link } from "@/lib/db/schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { deleteLink, updateLink } from "@/app/actions/links";
import { useState } from "react";
import { GripVertical, Trash2, Eye, EyeOff } from "lucide-react";

interface SortableLinkProps {
  link: Link;
}

export function SortableLink({ link }: SortableLinkProps) {
  const [isEnabled, setIsEnabled] = useState(link.isEnabled);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleToggle = async () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    await updateLink(link.id, { isEnabled: newState });
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this link?")) {
      await deleteLink(link.id);
    }
  };

  return (
    <Card ref={setNodeRef} style={style} className="p-4">
      <div className="flex items-center gap-3">
        <button
          className="cursor-grab active:cursor-grabbing touch-none p-2 hover:bg-accent rounded"
          {...attributes}
          {...listeners}
        >
          <GripVertical size={20} className="text-muted-foreground" />
        </button>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate">{link.title}</h3>
          <p className="text-sm text-muted-foreground truncate">{link.url}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {link.clicks} clicks
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleToggle}
            className="h-9 w-9 p-0"
          >
            {isEnabled ? (
              <Eye size={18} className="text-green-600" />
            ) : (
              <EyeOff size={18} className="text-muted-foreground" />
            )}
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={handleDelete}
            className="h-9 w-9 p-0 text-destructive hover:text-destructive"
          >
            <Trash2 size={18} />
          </Button>
        </div>
      </div>
    </Card>
  );
}
