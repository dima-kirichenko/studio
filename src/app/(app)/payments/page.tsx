import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, PlusCircle, Landmark, BarChart3, AlertTriangle } from "lucide-react";
import Image from 'next/image';

// Mock data - replace with actual data fetching
const savedPaymentMethods = [
  { id: "1", type: "Card", name: "Visa **** 1234", expiry: "12/25", icon: CreditCard },
  { id: "2", type: "Bank", name: "My Bank Account", icon: Landmark },
];

const paymentHistory = [
  { id: "1", date: "2024-07-01", description: "Rent - July 2024", amount: 850.00, status: "Paid" },
  { id: "2", date: "2024-06-01", description: "Rent - June 2024", amount: 850.00, status: "Paid" },
  { id: "3", date: "2024-05-01", description: "Late Fee - April Rent", amount: 25.00, status: "Open" },
];

export default function PaymentsPage() {
  return (
    <div className="space-y-8">
      <section>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Make a Payment</CardTitle>
            <CardDescription>Pay your rent or other outstanding charges.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-lg font-semibold text-foreground">Amount Due: <span className="text-primary">€850.00</span></p>
              <p className="text-sm text-muted-foreground">For: Rent - August 2024</p>
              <p className="text-sm text-destructive">Due Date: August 1, 2024</p>
            </div>
            <Button size="lg" className="w-full">
              <CreditCard className="mr-2 h-5 w-5" /> Pay Now
            </Button>
          </CardContent>
        </Card>
      </section>

      <Separator />

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-foreground">Saved Payment Methods</h2>
          <Button variant="outline">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New
          </Button>
        </div>
        {savedPaymentMethods.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedPaymentMethods.map((method) => (
              <Card key={method.id} className="shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base font-medium">{method.name}</CardTitle>
                  <method.icon className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  {method.type === "Card" && method.expiry && (
                    <p className="text-xs text-muted-foreground">Expires: {method.expiry}</p>
                  )}
                  <p className="text-sm text-foreground mt-1">
                    {method.type === "Card" ? "Credit/Debit Card" : "Bank Account"}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">Remove</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="shadow-md">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No saved payment methods.</p>
              <Button variant="link" className="mt-2">Add a payment method</Button>
            </CardContent>
          </Card>
        )}
        <div className="mt-4 p-4 border rounded-lg bg-secondary/50">
          <h3 className="font-semibold mb-2 text-sm">Security Notice</h3>
          <p className="text-xs text-muted-foreground">
            Your payment information is securely stored. CVC codes are dynamically blurred for added security during selection. Transactions over €100 may require biometric approval.
          </p>
        </div>
      </section>

      <Separator />

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Payment History</h2>
        <Card className="shadow-md">
          <CardContent className="p-0">
            {paymentHistory.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                      <TableCell>{payment.description}</TableCell>
                      <TableCell className="text-right">€{payment.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          payment.status === "Paid" ? "bg-accent/20 text-accent-foreground" : "bg-muted text-muted-foreground"
                        }`}>
                          {payment.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="p-6 text-center text-muted-foreground">No payment history available.</div>
            )}
          </CardContent>
        </Card>
         <div className="mt-4 h-48 w-full relative rounded-md overflow-hidden border p-4 bg-card">
            <div className="flex items-center justify-center h-full">
                <BarChart3 className="h-10 w-10 text-muted-foreground mr-2" />
                <p className="text-muted-foreground text-sm">(Payment trends chart placeholder - D3.js sparklines)</p>
            </div>
            <Image
                src="https://placehold.co/600x200.png"
                alt="Chart placeholder"
                layout="fill"
                objectFit="contain"
                className="opacity-10"
                data-ai-hint="chart graph"
            />
        </div>
      </section>
    </div>
  );
}
