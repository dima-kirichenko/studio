import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { MaintenanceRequest } from '@/lib/types';
import { getMaintenanceCategoryByKey } from '@/constants';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

type MaintenanceRequestCardProps = {
  request: MaintenanceRequest;
};

export function MaintenanceRequestCard({ request }: MaintenanceRequestCardProps) {
  const categoryDetails = getMaintenanceCategoryByKey(request.category);
  const Icon = categoryDetails.icon;

  const getStatusColor = (status: MaintenanceRequest['status']) => {
    switch (status) {
      case 'Submitted': return 'bg-blue-500 hover:bg-blue-600';
      case 'Assigned': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'In Progress': return 'bg-orange-500 hover:bg-orange-600';
      case 'Resolved': return 'bg-accent hover:bg-accent/90';
      case 'Cancelled': return 'bg-muted hover:bg-muted/90 text-muted-foreground';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Icon className="h-5 w-5 text-primary" />
            {request.title || categoryDetails.name}
          </CardTitle>
          <Badge className={`${getStatusColor(request.status)} text-xs text-white`}>{request.status}</Badge>
        </div>
        <CardDescription>
          Submitted: {new Date(request.submittedDate).toLocaleDateString()}
          {request.location && ` | Location: ${request.location}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
          {request.description}
        </p>
        {request.images && request.images.length > 0 && (
          <div className="h-32 w-full relative rounded-md overflow-hidden border">
            <Image 
              src={request.images[0]} 
              alt={`Image for ${request.title}`}
              layout="fill"
              objectFit="cover"
              data-ai-hint="repair damage"
            />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild variant="link" className="p-0 h-auto text-primary">
          <Link href={`/maintenance/${request.id}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
