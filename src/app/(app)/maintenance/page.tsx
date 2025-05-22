import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MaintenanceRequestCard } from '@/components/maintenance/maintenance-request-card';
import type { MaintenanceRequest } from '@/lib/types';
import { PlusCircle, Wrench } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// Mock data - replace with actual data fetching
const mockRequests: MaintenanceRequest[] = [
  {
    id: '1',
    title: 'Leaky Faucet in Kitchen',
    description: 'The kitchen faucet has been dripping constantly for the past two days. It seems to be getting worse.',
    category: 'leak',
    status: 'Submitted',
    submittedDate: '2024-07-15T10:00:00Z',
    location: 'Kitchen',
    images: ['https://placehold.co/600x400.png?text=Leaky+Faucet'],
    priority: 'High',
  },
  {
    id: '2',
    title: 'Broken Light Switch',
    description: 'The light switch in the main bedroom is not working. I tried flipping it multiple times but the light does not turn on.',
    category: 'electrical',
    status: 'In Progress',
    submittedDate: '2024-07-10T14:30:00Z',
    location: 'Main Bedroom',
    priority: 'Medium',
    contractor: { name: "Sparky Electricians", eta: "July 18th, AM"}
  },
  {
    id: '3',
    category: 'pest_control',
    description: 'Seeing ants near the window in the living room.',
    status: 'Resolved',
    submittedDate: '2024-06-20T09:00:00Z',
    title: 'Ants in Living Room',
    location: 'Living Room',
    priority: 'Low',
  },
];

export default function MaintenancePage() {
  const requests = mockRequests; // Replace with actual data fetching in the future

  return (
    <div className="space-y-8 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Maintenance Requests</h1>
        <Button asChild>
          <Link href="/maintenance/new">
            <PlusCircle className="mr-2 h-5 w-5" /> New Request
          </Link>
        </Button>
      </div>

      {/* Filters placeholder */}
      {/* 
      <div className="flex space-x-2">
        <Button variant="outline" size="sm">All</Button>
        <Button variant="ghost" size="sm">Open</Button>
        <Button variant="ghost" size="sm">Closed</Button>
      </div> 
      */}

      {requests.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {requests.map((request) => (
            <MaintenanceRequestCard key={request.id} request={request} />
          ))}
        </div>
      ) : (
        <Card className="shadow-md">
          <CardContent className="p-10 flex flex-col items-center text-center">
            <Wrench className="h-16 w-16 text-muted-foreground mb-6" />
            <h2 className="text-xl font-semibold mb-2 text-foreground">No Maintenance Requests</h2>
            <p className="text-muted-foreground mb-6">
              Looks like everything is in order! If you have an issue, submit a new request.
            </p>
            <Button asChild size="lg">
              <Link href="/maintenance/new">
                <PlusCircle className="mr-2 h-5 w-5" /> Submit New Request
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
      
      {/* FAB for mobile-like experience, could be conditionally rendered based on screen size if needed */}
      <div className="md:hidden fixed bottom-20 right-4 z-50">
         <Button asChild size="lg" className="rounded-full w-16 h-16 shadow-xl">
          <Link href="/maintenance/new" aria-label="New Maintenance Request">
            <PlusCircle className="h-8 w-8" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
