'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ImageIcon, Loader2, UploadCloud, Wand2, AlertTriangle, Camera, Trash2 } from 'lucide-react';
import { useState, useCallback, ChangeEvent, useRef } from 'react';
import { suggestMaintenanceRequestCategory, SuggestMaintenanceRequestCategoryOutput } from '@/ai/flows/suggest-maintenance-request-category';
import { MAINTENANCE_CATEGORIES_RAW, getMaintenanceCategoryByKey } from '@/constants';
import type { MaintenanceCategory } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Label } from '@/components/ui/label'; // Added import

const formSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters.' }).max(100),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }).max(500),
  categoryKey: z.string().min(1, { message: 'Please select a category.' }),
  location: z.string().optional(),
  // images: z.array(z.instanceof(File)).optional(), // For actual file uploads
});

export function MaintenanceRequestForm() {
  const { toast } = useToast();
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestedAiCategory, setSuggestedAiCategory] = useState<MaintenanceCategory | null>(null);
  const [suggestedAiDescription, setSuggestedAiDescription] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]); // Store image data URLs for preview
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      categoryKey: '',
      location: '',
    },
  });

  const handleAiSuggest = useCallback(async () => {
    const description = form.getValues('description');
    if (!description || description.length < 10) {
      toast({
        title: 'Description too short',
        description: 'Please provide more details in the description for AI suggestions.',
        variant: 'destructive',
      });
      return;
    }
    setIsSuggesting(true);
    setSuggestedAiCategory(null);
    setSuggestedAiDescription(null);
    try {
      const result: SuggestMaintenanceRequestCategoryOutput = await suggestMaintenanceRequestCategory({ userInput: description });
      const categoryDetail = getMaintenanceCategoryByKey(result.suggestedCategory);
      setSuggestedAiCategory(categoryDetail);
      setSuggestedAiDescription(result.suggestedDescription);
      
      // Optionally auto-select the AI suggested category
      // form.setValue('categoryKey', categoryDetail.key); 
      // form.setValue('description', result.suggestedDescription); // Or offer to use it
      toast({
        title: 'AI Suggestions Ready!',
        description: 'Category and description suggestions are available.',
      });
    } catch (error) {
      console.error('AI suggestion error:', error);
      toast({
        title: 'AI Suggestion Failed',
        description: 'Could not get AI suggestions at this time. Please select a category manually.',
        variant: 'destructive',
      });
    } finally {
      setIsSuggesting(false);
    }
  }, [form, toast]);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      // Max 3 images for simplicity
      const newImages = filesArray.slice(0, 3 - selectedImages.length).map(file => URL.createObjectURL(file));
      setSelectedImages(prev => [...prev, ...newImages]);

      // TODO: Handle actual file objects for form submission if needed:
      // form.setValue('images', filesArray.slice(0,3));
    }
  };

  const removeImage = (index: number) => {
    const imageUrlToRemove = selectedImages[index];
    URL.revokeObjectURL(imageUrlToRemove); // Revoke object URL to free memory
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ ...values, images: selectedImages }); // Log with preview URLs for now
    toast({
      title: 'Maintenance Request Submitted!',
      description: `Your request for "${values.title}" has been submitted.`,
      variant: 'default', // default is success-like with current theme
    });
    form.reset();
    setSelectedImages([]);
    setSuggestedAiCategory(null);
    setSuggestedAiDescription(null);
  }

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">New Maintenance Request</CardTitle>
        <CardDescription>Describe the issue you are experiencing. AI can help suggest a category.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title / Short Summary</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Kitchen sink leaking badly" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please provide as much detail as possible about the issue, when it started, and any specific observations."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="button" variant="outline" onClick={handleAiSuggest} disabled={isSuggesting} className="w-full sm:w-auto">
              {isSuggesting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Suggest Category & Refine Description with AI
            </Button>

            {suggestedAiCategory && (
              <Card className="bg-secondary/50 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Wand2 className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">AI Suggestions:</h4>
                </div>
                <p className="text-sm">
                  Suggested Category: <span className="font-medium text-primary">{suggestedAiCategory.name}</span>
                </p>
                {suggestedAiDescription && (
                  <p className="text-sm mt-1">
                    Suggested Description: <i className="text-muted-foreground">&quot;{suggestedAiDescription}&quot;</i>
                  </p>
                )}
                <div className="mt-3 space-x-2">
                   <Button type="button" size="sm" onClick={() => form.setValue('categoryKey', suggestedAiCategory.key)}>
                    Use Category
                  </Button>
                  {suggestedAiDescription && (
                    <Button type="button" size="sm" variant="outline" onClick={() => form.setValue('description', suggestedAiDescription)}>
                      Use Description
                    </Button>
                  )}
                </div>
              </Card>
            )}
            
            <Separator />

            <FormField
              control={form.control}
              name="categoryKey"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base">Select Category *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                    >
                      {MAINTENANCE_CATEGORIES_RAW.map((category) => (
                        <FormItem key={category.key} className="flex-1">
                          <FormControl>
                            <RadioGroupItem value={category.key} id={category.key} className="sr-only" />
                          </FormControl>
                          <Label
                            htmlFor={category.key}
                            className={`flex flex-col items-center justify-center rounded-md border-2 p-4 hover:border-primary cursor-pointer transition-all
                              ${field.value === category.key ? "border-primary bg-primary/10 ring-2 ring-primary" : "border-muted"}`}
                          >
                            <category.icon className={`h-8 w-8 mb-2 ${field.value === category.key ? "text-primary" : "text-muted-foreground"}`} />
                            <span className="text-sm font-medium">{category.name}</span>
                          </Label>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Separator />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Kitchen, Master Bathroom, Living Room Ceiling" {...field} />
                  </FormControl>
                  <FormDescription>Specify where the issue is located if applicable.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <div>
              <FormLabel className="text-base">Upload Photos (Optional, Max 3)</FormLabel>
              <FormDescription className="mb-2">AI can assist with photo capture quality in future updates.</FormDescription>
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {selectedImages.map((src, index) => (
                  <div key={index} className="relative group aspect-square border rounded-md overflow-hidden">
                    <Image src={src} alt={`Preview ${index + 1}`} layout="fill" objectFit="cover" data-ai-hint="damage photo" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                {selectedImages.length < 3 && (
                  <Label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-muted rounded-md cursor-pointer hover:border-primary transition-colors"
                  >
                    <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">Click to upload</span>
                    <span className="text-xs text-muted-foreground">(Max {3-selectedImages.length} more)</span>
                  </Label>
                )}
              </div>
              <FormControl>
                <Input 
                  id="file-upload" 
                  type="file" 
                  className="sr-only" 
                  accept="image/*" 
                  multiple 
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                />
              </FormControl>
              <div className="mt-2 p-3 border rounded-md bg-secondary/30 text-xs text-muted-foreground">
                <Camera className="inline h-4 w-4 mr-1"/>
                Future AI-Assisted Capture: Auto-focus on damage, EXIF data stripping for privacy.
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Request
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
