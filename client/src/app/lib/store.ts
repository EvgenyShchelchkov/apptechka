import { configureStore } from '@reduxjs/toolkit';
import likeReducer from '../../entities/like/model/likeSlice';
import medicineReducer from '../../entities/medicine/model/medicineSlice';
import authReducer from '../../entities/user/model/authSlice';
export const store = configureStore({
  reducer: {
    medicine: medicineReducer,
    like: likeReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;