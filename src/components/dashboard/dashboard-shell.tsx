'use client';

import { useState } from 'react';
import { Link2, LayoutDashboard, ExternalLink, BarChart3, Settings, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SignOutButton } from './sign-out-button';
import { LinkList } from './link-list';
import { CreateLinkForm } from './create-link-form';
import { Link } from '@/lib/db/schema';

interface DashboardShellProps {
  user: { name: string; email: string; image?: string | null };
  links: Link[];
  stats: {
    totalLinks: number;
    enabledLinks: number;
    totalClicks: number;
  };
}

export function DashboardShell({ user, links, stats }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 noise-bg">
      {/* Dot Pattern */}
      <div className="fixed inset-0 dot-pattern dark:dot-pattern-dark pointer-events-none opacity-30" />

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 bottom-0 w-64 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 z-40 transition-transform ${!sidebarOpen ? '-translate-x-full' : ''}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center gap-3 px-6 border-b border-neutral-200 dark:border-neutral-800">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-neutral-50 flex items-center justify-center">
              <Link2 size={16} className="text-neutral-50 dark:text-neutral-900" strokeWidth={2} />
            </div>
            <span className="font-semibold text-lg tracking-precise">MonoLink</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-sm font-medium">
              <LayoutDashboard size={18} strokeWidth={1.5} />
              Dashboard
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">
              <BarChart3 size={18} strokeWidth={1.5} />
              Analytics
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">
              <Settings size={18} strokeWidth={1.5} />
              Settings
            </button>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
            <div className="flex items-center gap-3 px-2">
              <div className="w-8 h-8 rounded-full bg-neutral-900 dark:bg-neutral-50 flex items-center justify-center">
                <span className="text-sm font-bold text-neutral-50 dark:text-neutral-900 mono-meta">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">@{user.name}</p>
                <p className="text-xs text-neutral-500 truncate mono-meta">{user.email}</p>
              </div>
            </div>
            <SignOutButton />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Top Bar */}
        <header className="h-16 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm sticky top-0 z-30">
          <div className="h-full flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                <Menu size={20} />
              </Button>
              <div>
                <h1 className="text-lg font-bold heading-tight">Dashboard</h1>
                <p className="text-xs text-neutral-500 mono-meta">@{user.name}</p>
              </div>
            </div>

            <a
              href={`${process.env.NEXT_PUBLIC_APP_URL}/${user.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-sm font-medium"
            >
              <ExternalLink size={14} strokeWidth={1.5} />
              <span className="hidden sm:inline">View Profile</span>
            </a>
          </div>
        </header>

        <div className="p-6 space-y-6 max-w-7xl mx-auto relative">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
              <div className="space-y-2">
                <p className="text-xs text-neutral-500 tracking-wide uppercase">Total Links</p>
                <p className="text-3xl font-bold mono-meta">{stats.totalLinks}</p>
                <p className="text-xs text-neutral-500">
                  <span className="text-green-600 mono-meta">{stats.enabledLinks}</span> active
                </p>
              </div>
            </Card>

            <Card className="p-6 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
              <div className="space-y-2">
                <p className="text-xs text-neutral-500 tracking-wide uppercase">Total Clicks</p>
                <p className="text-3xl font-bold mono-meta">{stats.totalClicks.toLocaleString()}</p>
                <p className="text-xs text-neutral-500">
                  {stats.totalLinks > 0 ? Math.round(stats.totalClicks / stats.totalLinks) : 0} avg per link
                </p>
              </div>
            </Card>

            <Card className="p-6 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
              <div className="space-y-2">
                <p className="text-xs text-neutral-500 tracking-wide uppercase">Profile</p>
                <p className="text-sm font-medium mono-meta truncate">{user.name}.monolink.app</p>
                <a
                  href={`${process.env.NEXT_PUBLIC_APP_URL}/${user.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 font-medium inline-flex items-center gap-1"
                >
                  Visit <ExternalLink size={10} />
                </a>
              </div>
            </Card>
          </div>

          {/* Links Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold heading-tight">Your Links</h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  Drag to reorder · Toggle to hide
                </p>
              </div>
            </div>

            <CreateLinkForm />

            {links.length > 0 ? (
              <div className="space-y-2">
                <LinkList initialLinks={links} />
              </div>
            ) : (
              <Card className="p-12 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                  <Link2 size={24} className="text-neutral-400" strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold mb-2">No links yet</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-500">
                  Create your first link to get started
                </p>
              </Card>
            )}
          </div>

          {/* Top Performing */}
          {links.length > 0 && (
            <Card className="p-6 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
              <h3 className="text-sm font-semibold tracking-wide uppercase text-neutral-500 mb-4">
                Top Performing
              </h3>
              {(() => {
                const topLink = [...links].sort((a, b) => b.clicks - a.clicks)[0];
                return (
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{topLink.title}</p>
                      <p className="text-sm text-neutral-500 mono-meta truncate">{topLink.url}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold mono-meta">{topLink.clicks}</p>
                      <p className="text-xs text-neutral-500">clicks</p>
                    </div>
                  </div>
                );
              })()}
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}

