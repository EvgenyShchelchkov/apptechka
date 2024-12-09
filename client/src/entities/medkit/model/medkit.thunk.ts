import { createAsyncThunk } from '@reduxjs/toolkit';
import medkitService from '../api/medkit.service';
import { medkitFormSchema, medkitSchema } from '../model/medkit.schema';

// First, create the thunk
export const fetchMedkits = createAsyncThunk('medkit/fetchMedkits', () =>
  medkitService.getAllMedkits(),
);

export const fetchOneMedkit = createAsyncThunk('medkit/fetchOneMedkit', (id: number) =>
  medkitService.getOneMedkit(id),
);



export const createMedkitThunk = createAsyncThunk('medkit/createMedkit', (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const parsedData = medkitFormSchema.parse(data);
  return medkitService.createMedkit(parsedData);
});

export const updateMedkitThunk = createAsyncThunk(
  'medkit/updateMedkit',
  ({ id, formData }: { id: number; formData: FormData }) => {
    const data = Object.fromEntries(formData);
    const parsedData = medkitSchema.parse(data);
    return medkitService.updateMedkit(id, parsedData);
  },
);

export const deleteMedkitThunk = createAsyncThunk('medkit/deleteMedkit', async (id: number) => {
  await medkitService.deleteMedkit(id);
  return { id };
});
