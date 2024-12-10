import type { z } from 'zod';
import type { medicineFormSchema, medicineSchema } from './medicine.schema';
import type { medicineInstanceSchema } from '../../medkit/model/medkit.schema';

export type MedicineType = z.infer<typeof medicineSchema>;
export type MedicineFormDataType = z.infer<typeof medicineFormSchema>;
export type MedicineInstanceType = z.infer<typeof medicineInstanceSchema>;
export type SortableKeysType = 'name' | 'code' | 'createdAt';
export type MedicineSliceType = {
  items: MedicineType[];
  error: string | null;
  sort: {
    key: SortableKeysType;
    order: 'asc' | 'desc';
  };
  isLoading: boolean;
  selected: MedicineType | null;
};