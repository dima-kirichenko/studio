import type { NavItem, MaintenanceCategory } from '@/lib/types';
import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, CreditCard, Wrench, FileText, User, Droplet, Zap, Bug, HardHat, MoreHorizontal, ShieldQuestion } from 'lucide-react';

export const APP_NAME = "TenantConnect";

export const NAV_ITEMS: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/payments', label: 'Payments', icon: CreditCard },
  { href: '/maintenance', label: 'Maintenance', icon: Wrench },
  { href: '/documents', label: 'Documents', icon: FileText },
  { href: '/profile', label: 'Profile', icon: User },
];

export const MAINTENANCE_CATEGORIES_RAW: Array<{ key: string; name: string; icon: LucideIcon }> = [
  { key: 'leak', name: 'Leak', icon: Droplet },
  { key: 'electrical', name: 'Electrical', icon: Zap },
  { key: 'plumbing', name: 'Plumbing', icon: Wrench },
  { key: 'pest_control', name: 'Pest Control', icon: Bug },
  { key: 'appliance_repair', name: 'Appliance Repair', icon: HardHat },
  { key: 'other', name: 'Other', icon: MoreHorizontal },
];

// Ensure this list matches the AI flow's output options
export const AI_MAINTENANCE_CATEGORIES_MAP: Record<string, MaintenanceCategory> = {
  leak: { key: 'leak', name: 'Leak', icon: Droplet },
  electrical: { key: 'electrical', name: 'Electrical', icon: Zap },
  plumbing: { key: 'plumbing', name: 'Plumbing', icon: Wrench },
  'pest control': { key: 'pest_control', name: 'Pest Control', icon: Bug }, // AI output might be "pest control"
  'appliance repair': { key: 'appliance_repair', name: 'Appliance Repair', icon: HardHat }, // AI output might be "appliance repair"
  other: { key: 'other', name: 'Other', icon: MoreHorizontal },
};

export const getMaintenanceCategoryByKey = (key: string): MaintenanceCategory => {
  const normalizedKey = key.toLowerCase();
  // Try direct match first for keys like 'leak', 'electrical'
  if (MAINTENANCE_CATEGORIES_RAW.find(cat => cat.key === normalizedKey)) {
    return MAINTENANCE_CATEGORIES_RAW.find(cat => cat.key === normalizedKey)!;
  }
  // Then try map for AI outputs like 'pest control'
  if (AI_MAINTENANCE_CATEGORIES_MAP[normalizedKey]) {
    return AI_MAINTENANCE_CATEGORIES_MAP[normalizedKey];
  }
  return { key: 'other', name: 'Other', icon: ShieldQuestion }; // Fallback
};
