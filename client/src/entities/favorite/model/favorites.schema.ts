import { z } from 'zod';
import { userSchema } from '../../user/model/auth.schema';

export const favoriteSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  medicine_instance_id: z.number(),
  User: userSchema.optional().nullable(),
});

export const favoriteFormSchema = favoriteSchema.omit({
  id: true,
  user_id: true,
  User: true,
});
