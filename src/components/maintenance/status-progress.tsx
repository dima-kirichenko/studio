import type { MaintenanceRequestStatus } from '@/lib/types';
import { CheckCircle2, CircleDashed, Loader, Wrench, ShieldX } from 'lucide-react';
import { cn } from '@/lib/utils';

type StatusProgressProps = {
  currentStatus: MaintenanceRequestStatus;
};

const statusSteps: MaintenanceRequestStatus[] = ["Submitted", "Assigned", "In Progress", "Resolved"];

export function StatusProgress({ currentStatus }: StatusProgressProps) {
  const currentIndex = statusSteps.indexOf(currentStatus);

  const getIcon = (status: MaintenanceRequestStatus, index: number) => {
    if (currentStatus === "Cancelled" && status === "Submitted") {
      return <ShieldX className="h-5 w-5 text-destructive" />;
    }
    if (index < currentIndex) {
      return <CheckCircle2 className="h-5 w-5 text-accent" />;
    }
    if (index === currentIndex) {
      if (status === "Resolved" || status === "Cancelled") return <CheckCircle2 className="h-5 w-5 text-accent" />;
      return <Loader className="h-5 w-5 text-primary animate-spin" />;
    }
    return <CircleDashed className="h-5 w-5 text-muted-foreground" />;
  };

  if (currentStatus === "Cancelled") {
    return (
       <div className="flex items-center p-4 border border-destructive bg-destructive/10 rounded-md">
        <ShieldX className="h-8 w-8 text-destructive mr-3" />
        <div>
          <p className="font-semibold text-destructive">Request Cancelled</p>
          <p className="text-sm text-destructive/80">This maintenance request has been cancelled.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <ol className="flex items-center w-full">
        {statusSteps.map((status, index) => (
          <li
            key={status}
            className={cn(
              "flex w-full items-center",
              index < statusSteps.length -1 ? "after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block" : "",
              index <= currentIndex ? "after:border-primary" : "after:border-muted"
            )}
          >
            <div className={cn(
                "flex flex-col items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0",
                index <= currentIndex ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              )}
            >
              {getIcon(status, index)}
            </div>
          </li>
        ))}
      </ol>
      <div className="flex justify-between mt-2">
        {statusSteps.map((status) => (
          <span key={status} className="text-xs text-center text-muted-foreground w-1/4 px-1">
            {status}
          </span>
        ))}
      </div>
    </div>
  );
}
