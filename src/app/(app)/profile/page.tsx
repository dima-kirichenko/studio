import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import type { UserProfile as UserProfileType } from "@/lib/types";
import { User, Mail, Phone, MapPin, Edit3, Bell, Shield, LogOut, Palette } from "lucide-react";

// Mock data - replace with actual data fetching
const userProfile: UserProfileType = {
  id: "user123",
  name: "Max Mustermann",
  email: "max.mustermann@example.com",
  phone: "+49 123 4567890",
  profilePictureUrl: "https://placehold.co/100x100.png",
  address: {
    street: "Hauptstrasse 1",
    city: "Baden-Baden",
    zipCode: "76530",
    country: "Germany",
  },
};

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader className="items-center text-center">
          <Avatar className="h-24 w-24 mb-4 ring-2 ring-primary ring-offset-2 ring-offset-background">
            <AvatarImage src={userProfile.profilePictureUrl} alt={userProfile.name} data-ai-hint="person portrait" />
            <AvatarFallback>{userProfile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl">{userProfile.name}</CardTitle>
          <CardDescription>{userProfile.email}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={userProfile.name} readOnly className="mt-1" />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue={userProfile.email} readOnly className="mt-1" />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" defaultValue={userProfile.phone || ""} readOnly={!userProfile.phone} placeholder="Not set" className="mt-1" />
            </div>
            {userProfile.address && (
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue={`${userProfile.address.street}, ${userProfile.address.zipCode} ${userProfile.address.city}`} readOnly className="mt-1" />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <Button className="w-full sm:w-auto">
            <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
          </Button>
        </CardFooter>
      </Card>

      <Separator />

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="h-5 w-5 mr-3 text-muted-foreground" />
              <div>
                <Label htmlFor="notifications" className="font-medium">Push Notifications</Label>
                <p className="text-xs text-muted-foreground">Receive updates for payments and maintenance.</p>
              </div>
            </div>
            <Switch id="notifications" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
             <div className="flex items-center">
              <Palette className="h-5 w-5 mr-3 text-muted-foreground" />
              <div>
                <Label htmlFor="dark-mode" className="font-medium">Dark Mode</Label>
                <p className="text-xs text-muted-foreground">Adaptive theme based on system settings.</p>
              </div>
            </div>
            <Switch id="dark-mode" />
             {/* Actual dark mode toggle would need client-side state management (e.g., next-themes) */}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-3 text-muted-foreground" />
               <div>
                <Label htmlFor="privacy" className="font-medium">Privacy Settings</Label>
                 <p className="text-xs text-muted-foreground">Manage your data and privacy preferences.</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Manage</Button>
          </div>
        </CardContent>
      </Card>
      
      <Separator />

      <Button variant="destructive" className="w-full">
        <LogOut className="mr-2 h-4 w-4" /> Log Out
      </Button>
    </div>
  );
}
