import { z } from 'zod';
import { medicineSchema } from '../../medicine/model/medicine.schema';

export const medicineInstanceSchema = z.object({
  id: z.number(),
  quantity: z.number(),
  expiration: z.string().datetime(),
  medicine_id: z.number(),
  createdAt: z.string().datetime(),
  Medicine: medicineSchema.optional().nullable(),
});

export const medkitSchema = z.object({
  id: z.number(),
  name: z.string(),
  user_id: z.number(),
  img: z.string().url(),
  createdAt: z.string().datetime(),
  MedicineInstances: z.array(medicineInstanceSchema),
});

export const medkitFormSchema = medkitSchema.omit({
  id: true,
  user_id: true,
  createdAt: true,
  MedicineInstances: true,
});
