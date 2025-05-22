import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { MaintenanceRequest } from '@/lib/types';
import { getMaintenanceCategoryByKey } from '@/constants';
import { StatusProgress } from '@/components/maintenance/status-progress';
import { CalendarDays, MapPin, UserCheck, MessageSquare, Phone, ShieldAlert, Edit3, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Mock data - replace with actual data fetching based on params.id
const getMockRequest = (id: string): MaintenanceRequest | null => {
  if (id === '1') {
    return {
      id: '1',
      title: 'Leaky Faucet in Kitchen',
      description: 'The kitchen faucet has been dripping constantly for the past two days. It seems to be getting worse. Water is pooling under the sink and starting to damage the cabinet. Need urgent attention.',
      category: 'leak',
      status: 'Submitted',
      submittedDate: '2024-07-15T10:00:00Z',
      location: 'Kitchen Sink Area',
      images: [
        'https://placehold.co/600x400.png?text=Leaky+Faucet+1', 
        'https://placehold.co/600x400.png?text=Under+Sink+Damage'
      ],
      priority: 'High',
    };
  }
  if (id === '2') {
    return {
      id: '2',
      title: 'Broken Light Switch',
      description: 'The light switch in the main bedroom is not working. I tried flipping it multiple times but the light does not turn on. Checked the bulb, it is fine.',
      category: 'electrical',
      status: 'In Progress',
      submittedDate: '2024-07-10T14:30:00Z',
      location: 'Main Bedroom',
      priority: 'Medium',
      contractor: { name: "Sparky Electricians", eta: "July 18th, 10:00 AM - 12:00 PM"}
    };
  }
   if (id === '3') {
    return {
      id: '3',
      title: 'Ants in Living Room',
      description: 'Seeing ants near the window in the living room. They seem to be coming from a crack in the window sill. Need pest control to take a look.',
      category: 'pest_control',
      status: 'Resolved',
      submittedDate: '2024-06-20T09:00:00Z',
      location: 'Living Room Window',
      priority: 'Low',
      contractor: { name: "Pest Busters Inc."}
    };
  }
  return null;
};

export default function MaintenanceDetailPage({ params }: { params: { id: string } }) {
  const request = getMockRequest(params.id);

  if (!request) {
    return (
      <div className="text-center py-10">
        <ShieldAlert className="mx-auto h-12 w-112 text-destructive mb-4" />
        <h1 className="text-2xl font-bold">Maintenance Request Not Found</h1>
        <p className="text-muted-foreground">The request you are looking for does not exist or has been moved.</p>
        <Button asChild className="mt-6">
          <Link href="/maintenance">Back to Maintenance List</Link>
        </Button>
      </div>
    );
  }

  const categoryDetails = getMaintenanceCategoryByKey(request.category);
  const Icon = categoryDetails.icon;

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Icon className="h-7 w-7 text-primary" />
                <CardTitle className="text-2xl">{request.title}</CardTitle>
              </div>
              <CardDescription className="text-sm">Category: {categoryDetails.name}</CardDescription>
            </div>
            <Badge variant={request.priority === "High" ? "destructive" : request.priority === "Medium" ? "secondary" : "outline"} className="text-xs whitespace-nowrap">
              Priority: {request.priority || "Not set"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2 text-foreground">Status</h3>
            <StatusProgress currentStatus={request.status} />
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-1 text-foreground">Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <p className="flex items-center"><CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" /> <strong className="mr-1">Submitted:</strong> {new Date(request.submittedDate).toLocaleString()}</p>
              {request.location && <p className="flex items-center"><MapPin className="h-4 w-4 mr-2 text-muted-foreground" /> <strong className="mr-1">Location:</strong> {request.location}</p>}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-1 text-foreground">Description</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{request.description}</p>
          </div>

          {request.images && request.images.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2 text-foreground">Attached Images</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {request.images.map((imgSrc, index) => (
                  <div key={index} className="relative aspect-video rounded-md overflow-hidden border group">
                    <Image src={imgSrc} alt={`Evidence ${index + 1}`} layout="fill" objectFit="cover" data-ai-hint="damage evidence" />
                     {/* Basic lightbox functionality can be added here */}
                  </div>
                ))}
              </div>
            </div>
          )}

          {request.contractor && (
            <>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2 text-foreground">Assigned Contractor</h3>
              <Card className="bg-secondary/50 p-4">
                <div className="flex items-center gap-3">
                  <UserCheck className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">{request.contractor.name}</p>
                    {request.contractor.eta && <p className="text-xs text-muted-foreground">ETA: {request.contractor.eta}</p>}
                  </div>
                </div>
                {request.status === "In Progress" && request.contractor.eta && (
                  <div className="mt-3 h-40 w-full relative rounded-md overflow-hidden border">
                    <Image 
                      src="https://placehold.co/600x200.png" 
                      alt="Contractor ETA map placeholder"
                      layout="fill"
                      objectFit="cover"
                      data-ai-hint="map route"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <p className="text-white text-sm font-medium">(Live map placeholder for ETA)</p>
                    </div>
                  </div>
                )}
              </Card>
            </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-6 border-t">
          <div className="flex gap-2">
            {request.status !== "Resolved" && request.status !== "Cancelled" && (
              <>
                <Button variant="outline"><Edit3 className="h-4 w-4 mr-2" /> Edit Request</Button>
                <Button variant="destructive"><Trash2 className="h-4 w-4 mr-2" /> Cancel Request</Button>
              </>
            )}
          </div>
          <Button variant="default"><MessageSquare className="h-4 w-4 mr-2" /> Contact Support</Button>
        </CardFooter>
      </Card>

      {/* Communications Log Placeholder */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Communication Log</CardTitle>
          <CardDescription>Updates and messages regarding this request.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Example Log Item */}
            <div className="flex gap-3">
              <div className="flex-shrink-0 pt-1">
                <UserCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Property Manager <span className="text-xs text-muted-foreground"> - July 16, 2024, 9:00 AM</span></p>
                <p className="text-sm text-muted-foreground">We have assigned Sparky Electricians to your request. They will contact you shortly to schedule a visit.</p>
              </div>
            </div>
             <div className="flex gap-3">
              <div className="flex-shrink-0 pt-1">
                <Phone className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">You (via app) <span className="text-xs text-muted-foreground"> - July 15, 2024, 10:05 AM</span></p>
                <p className="text-sm text-muted-foreground">Follow up: The leak seems to be getting worse.</p>
              </div>
            </div>
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground">(More communications will appear here)</p>
            </div>
          </div>
          <div className="mt-4">
            <Textarea placeholder="Type a message to support or property manager..." className="mb-2" />
            <Button>Send Message</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
