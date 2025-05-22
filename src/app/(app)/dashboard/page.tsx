import { QuickActionCard } from '@/components/dashboard/quick-action-card';
import { UrgentAlert } from '@/components/dashboard/urgent-alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Wrench, FileText, Info, MessageSquareWarning } from 'lucide-react';
import Image from 'next/image';

export default function DashboardPage() {
  const hasUrgentAlert = true; // Example state
  const upcomingMaintenance = {
    title: "Kitchen Sink Repair",
    contractor: "John Doe Plumbing",
    eta: "Tomorrow, 2:00 PM",
    status: "Assigned"
  };

  return (
    <div className="space-y-8">
      {hasUrgentAlert && (
        <UrgentAlert
          title="Overdue Payment!"
          description="Your rent payment of €850 for July is overdue. Please pay by July 5th to avoid late fees."
        />
      )}

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <QuickActionCard href="/payments" icon={CreditCard} label="Pay Rent" variant="default" />
          <QuickActionCard href="/maintenance/new" icon={Wrench} label="Report Issue" variant="secondary" />
          <QuickActionCard href="/documents" icon={FileText} label="View Lease" variant="secondary" />
        </div>
      </section>

      <Separator />

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Upcoming Maintenance</h2>
        {upcomingMaintenance ? (
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-6 w-6 text-primary" /> 
                {upcomingMaintenance.title}
              </CardTitle>
              <CardDescription>Status: <span className="font-semibold text-accent">{upcomingMaintenance.status}</span></CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><span className="font-medium">Contractor:</span> {upcomingMaintenance.contractor}</p>
              <p><span className="font-medium">ETA:</span> {upcomingMaintenance.eta}</p>
              <div className="mt-4 h-40 w-full relative rounded-md overflow-hidden">
                <Image 
                  src="https://placehold.co/600x400.png" 
                  alt="Map placeholder"
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint="map street"
                />
                 <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <p className="text-white text-sm font-medium">(Live map placeholder)</p>
                 </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-md">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Info className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No upcoming maintenance scheduled.</p>
            </CardContent>
          </Card>
        )}
      </section>
      
      <Separator />

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Recent Activity</h2>
         <Card className="shadow-md">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <MessageSquareWarning className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No recent activity to display.</p>
              <p className="text-xs text-muted-foreground mt-1">(Activity feed placeholder)</p>
            </CardContent>
          </Card>
      </section>
    </div>
  );
}
