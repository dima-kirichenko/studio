import type { ReactNode } from 'react';
import { Header } from './header';
import { BottomNavigation } from './bottom-navigation';

type AppShellProps = {
  children: ReactNode;
  pageTitle: string;
};

export function AppShell({ children, pageTitle }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header title={pageTitle} />
      {/* Mobile: padding bottom for bottom nav, Desktop: normal padding */}
      <main className="flex-1 container py-6 pb-24 md:pb-6"> 
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
}
