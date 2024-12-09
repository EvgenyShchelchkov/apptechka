import type { z } from 'zod';
import type { medkitFormSchema, medkitSchema } from './medkit.schema';

export type MedkitType = z.infer<typeof medkitSchema>;
export type MedkitFormDataType = z.infer<typeof medkitFormSchema>;
export type MedkitSliceType = {
  items: MedkitType[];
  error: string | null;
  showCreateModal: boolean;
  showUpdateModal: boolean;
  isLoading: boolean;
  selected: MedkitType | null;
};
