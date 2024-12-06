import { z } from 'zod';
import { userSchema } from '../../user/model/auth.schema';

export const medkitSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  userId: z.number(),
  link: z.string(),
  image: z.string(),
  createdAt: z.string().datetime(),
  User: userSchema.optional().nullable(),
});

export const bookFormSchema = bookSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  User: true,
});
