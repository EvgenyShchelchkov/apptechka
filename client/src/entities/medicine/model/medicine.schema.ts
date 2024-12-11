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

// export const medicineFormSchema = medicineSchema.omit({
//   id: true,
//   createdAt: true,
// });

export const medicineFormSchema = z.object({
 
  name: z.string(),
  description: z.string(),
  code: z.string(),
  img: z.object({name: z.string(), size: z.number(), type: z.string(), webkitRelativePath: z.string()}),
  presciption: z.string(),
  category: z.string(),
 
});

// name: z.string(), size: z.number(), type: z.string(), webkitRelativePath: z.string()