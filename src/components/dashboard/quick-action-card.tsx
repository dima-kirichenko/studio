import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type QuickActionCardProps = {
  href: string;
  icon: LucideIcon;
  label: string;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
};

export function QuickActionCard({ href, icon: Icon, label, className, variant = "default" }: QuickActionCardProps) {
  return (
    <Card className={cn("hover:shadow-lg transition-shadow", className)}>
      <CardContent className="p-4 flex flex-col items-center justify-center aspect-square">
        <Button asChild variant={variant} size="lg" className="w-full h-full flex flex-col gap-2 py-4 text-center">
          <Link href={href}>
            <Icon className="h-10 w-10" />
            <span className="text-sm font-medium whitespace-normal">{label}</span>
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
