import { createAsyncThunk } from '@reduxjs/toolkit';
import { medkitFormSchema } from './medkit.schemas';
import medkitService from '../../medkit/api/medkit.service';

// First, create the thunk
export const loadAllMedkits = createAsyncThunk('medkit/loadAllMedkits', () =>
  medkitService.getAllMedkits(),
);

export const loadOneMedkit = createAsyncThunk('medkit/loadOneMedkit', (id: number) =>
  medkitService.getOneMedkit(id),
);

export const createMedkit = createAsyncThunk('medkit/createMedkit', async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const parsedData = medkitFormSchema.parse(data);
  const newMedkit = await medkitService.createMedkit(parsedData);
  return newMedkit;
});

export const deleteMedkit = createAsyncThunk('medkit/deleteMedkit', async (id: number) => {
  await medkitService.deleteMedkit(id);
  return id;
});

export const updateMedkit = createAsyncThunk(
  'medkit/updateMedkit',
  async ({ id, formData }: { id: number; formData: FormData }) => {
    const data = Object.fromEntries(formData);
    const parsedData = medkitFormSchema.parse(data);
    const updatedMedkit = await medkitService.updateMedkit(id, parsedData);
    return updatedMedkit;
  },
);
