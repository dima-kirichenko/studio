import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Document, DocumentType } from "@/lib/types";
import { FileText, Search, Filter, Download, Eye, Edit, UploadCloud, AlertOctagon } from "lucide-react";
import Link from 'next/link';

const mockDocuments: Document[] = [
  { id: "1", name: "Lease Agreement 2024", type: "Lease Agreement", uploadDate: "2024-01-15", url: "#", size: "2.1 MB" },
  { id: "2", name: "January Rent Invoice", type: "Invoice", uploadDate: "2024-01-05", url: "#", size: "150 KB" },
  { id: "3", name: "Community Guidelines", type: "Notice", uploadDate: "2023-12-01", url: "#", size: "500 KB" },
  { id: "4", name: "Appliance Manual - Fridge", type: "Other", uploadDate: "2024-01-20", url: "#", size: "5.5 MB" },
];

const documentTypes: DocumentType[] = ["Lease Agreement", "Invoice", "Notice", "Other"];

export default function DocumentsPage() {
  const documents = mockDocuments;

  return (
    <div className="space-y-8">
      <section>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Document Center</CardTitle>
            <CardDescription>Access your lease, invoices, and other important documents.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Input type="search" placeholder="Search documents (OCR powered)..." className="pl-10" />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {documentTypes.map(type => (
                    <SelectItem key={type} value={type.toLowerCase().replace(' ', '_')}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="mr-2 h-4 w-4" /> Apply Filters
              </Button>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              Smart Search: OCR-powered keyword lookup in PDF leases. Filters by date, type, or tags.
            </div>
          </CardContent>
        </Card>
      </section>

       <div className="flex justify-end">
        <Button>
          <UploadCloud className="mr-2 h-4 w-4" /> Upload Document
        </Button>
      </div>

      {documents.length > 0 ? (
        <Card className="shadow-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date Uploaded</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-primary" />
                    {doc.name}
                  </TableCell>
                  <TableCell>{doc.type}</TableCell>
                  <TableCell>{new Date(doc.uploadDate).toLocaleDateString()}</TableCell>
                  <TableCell>{doc.size}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="icon" title="View">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Download">
                      <Download className="h-4 w-4" />
                    </Button>
                    {/* eSignature Flow placeholder */}
                    {doc.type === "Lease Agreement" && (
                        <Button variant="ghost" size="icon" title="eSign">
                          <Edit className="h-4 w-4" />
                        </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ) : (
        <Card className="shadow-md">
          <CardContent className="p-10 flex flex-col items-center text-center">
            <AlertOctagon className="h-16 w-16 text-muted-foreground mb-6" />
            <h2 className="text-xl font-semibold mb-2 text-foreground">No Documents Found</h2>
            <p className="text-muted-foreground">There are no documents available at this time.</p>
          </CardContent>
        </Card>
      )}
      
      <Card className="mt-8 bg-secondary/30 shadow-none border-dashed">
        <CardHeader>
            <CardTitle className="text-lg">eSignature Flow</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground">
                Securely sign documents directly within the app. Features guided overlay with pinch-to-zoom for contract review.
                (This is a placeholder for the eSignature functionality).
            </p>
            <Button variant="link" className="p-0 h-auto mt-2">Learn more about eSignatures</Button>
        </CardContent>
      </Card>

    </div>
  );
}
