// 'use server'
'use server';

/**
 * @fileOverview Provides AI-powered suggestions for maintenance request categories and descriptions.
 *
 * - suggestMaintenanceRequestCategory - A function that suggests maintenance request categories based on user input.
 * - SuggestMaintenanceRequestCategoryInput - The input type for the suggestMaintenanceRequestCategory function.
 * - SuggestMaintenanceRequestCategoryOutput - The return type for the suggestMaintenanceRequestCategory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestMaintenanceRequestCategoryInputSchema = z.object({
  userInput: z
    .string()
    .describe(
      'The user input describing the maintenance issue. This should be a free-form text description.'
    ),
});

export type SuggestMaintenanceRequestCategoryInput = z.infer<
  typeof SuggestMaintenanceRequestCategoryInputSchema
>;

const SuggestMaintenanceRequestCategoryOutputSchema = z.object({
  suggestedCategory: z
    .string()
    .describe(
      'The AI-suggested category for the maintenance request.  Choose from: leak, electrical, plumbing, pest control, appliance repair, other.'
    ),
  suggestedDescription: z
    .string()
    .describe(
      'A concise AI-suggested re-phrasing of the user input, suitable for the maintenance request description field.'
    ),
});

export type SuggestMaintenanceRequestCategoryOutput = z.infer<
  typeof SuggestMaintenanceRequestCategoryOutputSchema
>;

export async function suggestMaintenanceRequestCategory(
  input: SuggestMaintenanceRequestCategoryInput
): Promise<SuggestMaintenanceRequestCategoryOutput> {
  return suggestMaintenanceRequestCategoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestMaintenanceRequestCategoryPrompt',
  input: {schema: SuggestMaintenanceRequestCategoryInputSchema},
  output: {schema: SuggestMaintenanceRequestCategoryOutputSchema},
  prompt: `You are an AI assistant helping tenants report maintenance issues.  The tenant will provide a description of the issue, and you will suggest a category and re-write their description to be more clear and concise.

Here is the tenant's description of the issue:
{{userInput}}

Based on the above description, please suggest both a category and a description. The category must be one of the following: leak, electrical, plumbing, pest control, appliance repair, or other. Return the category and description in the JSON format.`,
});

const suggestMaintenanceRequestCategoryFlow = ai.defineFlow(
  {
    name: 'suggestMaintenanceRequestCategoryFlow',
    inputSchema: SuggestMaintenanceRequestCategoryInputSchema,
    outputSchema: SuggestMaintenanceRequestCategoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
