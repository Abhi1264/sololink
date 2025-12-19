'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { createLink } from '@/app/actions/links';
import { Plus, X } from 'lucide-react';

export function CreateLinkForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createLink({ title, url, isEnabled: true });
      setTitle('');
      setUrl('');
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to create link:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <Button 
        onClick={() => setIsOpen(true)} 
        className="w-full h-11 bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-hover"
      >
        <Plus size={18} strokeWidth={1.5} className="mr-2" />
        Add New Link
      </Button>
    );
  }

  return (
    <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-base tracking-precise">New Link</h3>
            <p className="text-sm text-neutral-500 mt-0.5">Add a new link to your profile</p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 p-0"
          >
            <X size={16} strokeWidth={1.5} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My Portfolio"
              required
              className="h-10 border-neutral-200 dark:border-neutral-800 focus:border-neutral-900 dark:focus:border-neutral-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url" className="text-sm font-medium">
              URL
            </Label>
            <Input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              required
              className="h-10 border-neutral-200 dark:border-neutral-800 focus:border-neutral-900 dark:focus:border-neutral-50"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="flex-1 h-10 bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-hover"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-neutral-400 border-t-neutral-50 rounded-full animate-spin" />
                  Creating...
                </span>
              ) : (
                'Create Link'
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="h-10 px-6 border-neutral-200 dark:border-neutral-800"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}
