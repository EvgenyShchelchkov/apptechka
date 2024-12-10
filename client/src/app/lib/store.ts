import { configureStore } from '@reduxjs/toolkit';
import favoriteReducer from '../../entities/favorite/model/favorites.slice';
import medicineReducer from '../../entities/medicine/model/medicine.slice';
import medkitReducer from '../../entities/medkit/model/medkit.slice';
import authReducer from '../../entities/user/model/authSlice';
export const store = configureStore({
  reducer: {
    medkit: medkitReducer,
    medicine: medicineReducer,
    favorite: favoriteReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
