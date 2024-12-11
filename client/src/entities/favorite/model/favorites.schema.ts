import { z } from 'zod';
import { medicineInstanceSchema } from '../../medkit/model/medkit.schema';
import { userSchema } from '../../user/model/auth.schema';

export const favoriteSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  medicine_instance_id: z.number(),
  User: userSchema,
  MedicineInstance: medicineInstanceSchema,
});

export const favoriteFormSchema = favoriteSchema.omit({
  id: true,
  user_id: true,
  User: true,
  MedicineInstance: true,
});
