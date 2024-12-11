import { createAsyncThunk } from '@reduxjs/toolkit';
// import medicineService from '../api/medicine.service';
import { medicineFormSchema } from './medicine.schema';
import medicineService from '../api/medicine.service';

// First, create the thunk
export const fetchMedicines = createAsyncThunk('medicine/fetchMedicines', () =>
  medicineService.getAllMedicines(),
);

export const createMedicineThunk = createAsyncThunk(
  'medicine/createMedicine',
  ({formData, id}: {formData: FormData, id: number}) => {
    try {
      const data = Object.fromEntries(formData)
      console.log(data, "------------------------------------------------------------------------------------------")
    const parsedData = medicineFormSchema.parse(data);

    return medicineService.createMedicine(formData, id);
    } catch (error) {
      console.log(error);
      
    }
    
  },
);
// defaultValue={medicine?.name}
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
