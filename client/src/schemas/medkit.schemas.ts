import { z } from 'zod';
import { userSchema } from '../entities/user/model/auth.schema';

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

export type MedkitT = z.infer<typeof medkitSchema>;
export type MedkitFormDataT = z.infer<typeof medkitFormSchema>;

export type MedkitState = {
  list: MedkitT[];
  loading: boolean;
  error: string | null;
  showModal: boolean;
  isSuccessful: boolean;
  isEditing: boolean;
  editParticipant: MedkitT | null;
};

export type MedkitSliceT = {
  items: MedkitT[];
  error: string | null;
  selected: MedkitT | null;
};
