'use client';

import type { ReactNode } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/constants';

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  const getCurrentPageTitle = () => {
    const currentNavItem = NAV_ITEMS.find(item => pathname.startsWith(item.href));
    if (pathname.includes('/maintenance/new')) return 'New Request';
    if (pathname.match(/\/maintenance\/[^/]+$/)) return 'Request Details'; // For /maintenance/[id]
    return currentNavItem ? currentNavItem.label : 'TenantConnect';
  };

  return (
    <AppShell pageTitle={getCurrentPageTitle()}>
      {children}
    </AppShell>
  );
}
