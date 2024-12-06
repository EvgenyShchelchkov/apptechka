import { z } from 'zod';

export const medkitFormSchema = z.object({
    name: z.string(),
    img: z.string(),
  });

  export const medkitSchema = z.object({
    id: z.number(),
    name: z.string(),
    img: z.string(),
    // User: userSchema,
  });

  export type MedkitT = z.infer<typeof medkitSchema>;
  export type MedkitFormDataT = z.infer<typeof medkitFormSchema>;

  export type MedkitSliceT = {
    items: MedkitT[];
    error: string | null;
    selected: MedkitT | null;
  };