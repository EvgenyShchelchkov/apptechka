import { z } from 'zod';

export const medicineSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  code: z.string(),
  img: z.string(),
  presciption: z.string(),
  category: z.string(),
  createdAt: z.string().datetime(),
});

export const medicineFormSchema = medicineSchema.omit({
  id: true,
  createdAt: true,
});
