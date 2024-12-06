import { createAsyncThunk } from '@reduxjs/toolkit';
import { medkitFormSchema } from '../schemas/medkit.schemas';
import medkitService from '../services/medkit.service';

// First, create the thunk
export const loadAllMedkits = createAsyncThunk('medkit/loadAllMedkits', () =>
  medkitService.getAllMedkits(),
);

export const loadOneMedkit = createAsyncThunk('medkit/loadOneMedkit', (id: number) =>
  medkitService.getOneMedkit(id),
);

export const createMedkit = createAsyncThunk('medkit/createMedkit', (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const parsedData = medkitFormSchema.parse(data);
  return medkitService.createMedkit(parsedData);
});

export const deletMedkit = createAsyncThunk('medkit/deletMedkit', (id: number) =>
  medkitService.deleteMedkit(id),
);

export const updateMedkit = createAsyncThunk(
  'medkit/updateMedkit',
  ({ id, formData }: { id: number; formData: FormData }) => {
    const data = Object.fromEntries(formData);
    const parsedData = medkitFormSchema.parse(data);
    return medkitService.updateMedkit(id, parsedData);
  },
);
