import { createAsyncThunk } from '@reduxjs/toolkit';
import medicineService from '../api/medicine.service';
import { medicineFormSchema } from './medicine.schema';

// First, create the thunk
export const fetchMedicines = createAsyncThunk('medicine/fetchMedicines', () =>
  medicineService.getAllMedicines(),
);

export const createMedicineThunk = createAsyncThunk(
  'medicine/createMedicine',
  (formData: FormData) => {
    const data = Object.fromEntries(formData);
    const parsedData = medicineFormSchema.parse(data);
    return medicineService.createMedicine(parsedData);
  },
);

export const updateMedicineThunk = createAsyncThunk(
  'medicine/updateMedicine',
  ({ id, formData }: { id: number; formData: FormData }) => {
    const data = Object.fromEntries(formData);
    const parsedData = medicineFormSchema.parse(data);
    return medicineService.updateMedicine(id, parsedData);
  },
);

export const updateMedicineQuantity = createAsyncThunk(
  'medicine/updateMedicineQuantity',
  async (id: number) => {
    const updatedMedicineCount = await medicineService.updateMedicineCount(id);
    return updatedMedicineCount;
  },
);

export const deleteMedicineThunk = createAsyncThunk(
  'medicine/deleteMedicine',
  async (id: number) => {
    await medicineService.deleteMedicine(id);
    return { id };
  },
);
