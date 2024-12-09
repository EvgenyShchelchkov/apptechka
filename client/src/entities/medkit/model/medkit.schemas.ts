import { z } from 'zod';
import { medicineSchema } from '../../medicine/model/medicine.schema';
import { userSchema } from '../../user/model/auth.schema';

export const medkitFormSchema = z.object({
  name: z.string(),
  img: z.string(),
});

export const medkitSchema = z.object({
  id: z.number(),
  name: z.string(),
  img: z.string(),
  User: userSchema,
});

export const medicineInstanceSchema = z.object({
  id: z.number(),
  quantity: z.number(),
  expiration: z.string().datetime(),
  medicine_id: z.number(),
  med_kit_id: z.number(),
  Medicine: medicineSchema,
});

export const allMedkitSchema = z.object({
  id: z.number(),
  name: z.string(),
  img: z.string(),
  user_id: z.number(),
  MedicineInstances: z.array(medicineInstanceSchema),
});
