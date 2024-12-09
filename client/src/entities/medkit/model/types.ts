import type { z } from 'zod';
import type { medkitFormSchema, medkitSchema } from './medkit.schemas';
export type MedkitT = z.infer<typeof medkitSchema>;
export type MedkitFormDataT = z.infer<typeof medkitFormSchema>;

export type MedkitState = {
  list: MedkitT[];
  loading: boolean;
  error: string | null;
  showAddModal: boolean;
  showEditModal: boolean;
  editMedkit: MedkitT | null;
};

export type MedkitSliceT = {
  items: MedkitT[];
  error: string | null;
  selected: MedkitT | null;
};
