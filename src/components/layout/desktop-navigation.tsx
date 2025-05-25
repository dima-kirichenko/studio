'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/constants';
import { cn } from '@/lib/utils';

export function DesktopNavigation() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
              isActive
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-primary hover:bg-primary/5',
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            <item.icon className={cn('h-4 w-4', isActive ? 'text-primary' : 'text-muted-foreground')} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
