import { z } from 'zod';
import { userSchema } from '../../user/model/auth.schema';

export const likeSchema = z.object({
  id: z.number(),
  userId: z.number(),
  bookId: z.number(),
  User: userSchema.optional().nullable(),
});

export const likeFormSchema = likeSchema.omit({ id: true, userId: true, User: true });
