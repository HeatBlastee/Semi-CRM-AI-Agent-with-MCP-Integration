import { z } from 'zod';

export const leadSchema = z.object({
    name: z.string(),
    source: z.string(),
    contact: z.object({
        email: z.string().email().optional(),
        phone: z.string().optional()
    }).optional(),
    interestedProducts: z.array(z.string()).optional().default([]),
    status: z.string().optional().default('new'),
    notes: z.string().optional(),
});
