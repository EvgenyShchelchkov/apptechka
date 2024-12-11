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

export const medicinesInstanceSchema = z.object({
  id: z.number(),
  quantity: z.number(),
  expiration: z.string().datetime(),
  medicine_id: z.number(),
  med_kit_id: z.number(),
  createdAt: z.string().datetime(),
  MedKit: z
    .object({
      id: z.number(),
      name: z.string(),
      user_id: z.number(),
      img: z.string(),
      createdAt: z.string().datetime(),
    })
    .optional()
    .nullable(),
});

export const allMedicinesSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  code: z.string(),
  img: z.string(),
  presciption: z.string(),
  category: z.string(),
  createdAt: z.string().datetime(),
  MedicineInstances: z.array(medicinesInstanceSchema).optional(),
});
