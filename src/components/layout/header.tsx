import Link from 'next/link';
import { Building2 } from 'lucide-react'; // Or any other suitable app icon
import { APP_NAME } from '@/constants';

type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold text-primary">
          <Building2 className="h-6 w-6" />
          <span>{APP_NAME}</span>
        </Link>
        <h1 className="text-xl font-medium text-foreground">{title}</h1>
        {/* Placeholder for profile/settings icon if needed */}
        <div className="w-10 h-10"></div> 
      </div>
    </header>
  );
}
