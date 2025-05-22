import type { LucideIcon } from 'lucide-react';

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export type MaintenanceCategory = {
  key: string;
  name: string;
  icon: LucideIcon;
};

export type MaintenanceRequestStatus = "Submitted" | "Assigned" | "In Progress" | "Resolved" | "Cancelled";

export type MaintenanceRequest = {
  id: string;
  title: string;
  description: string;
  category: MaintenanceCategory['key'];
  status: MaintenanceRequestStatus;
  submittedDate: string; // ISO date string
  images?: string[]; // URLs of uploaded images
  location?: string; // e.g. "Kitchen", "Bathroom"
  priority?: "Low" | "Medium" | "High";
  contractor?: {
    name: string;
    eta?: string; // Could be a specific time or "Within 24 hours"
  };
};

export type PaymentMethod = {
  id: string;
  type: "Card" | "PayPal" | "Bank Transfer";
  last4?: string;
  expiry?: string;
  name: string; // e.g. "Visa **** 1234" or "PayPal Account"
};

export type Payment = {
  id: string;
  amount: number;
  date: string; // ISO date string
  method: string; // Name of the payment method used
  status: "Paid" | "Pending" | "Failed";
  description: string; // e.g. "Rent for January 2024"
};

export type DocumentType = "Lease Agreement" | "Invoice" | "Notice" | "Other";

export type Document = {
  id: string;
  name: string;
  type: DocumentType;
  uploadDate: string; // ISO date string
  url: string; // URL to the document
  size: string; // e.g. "2.3 MB"
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profilePictureUrl?: string;
  address?: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
};
