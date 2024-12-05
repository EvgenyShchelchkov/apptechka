import { configureStore } from '@reduxjs/toolkit';
import likeReducer from '../../entities/like/model/likeSlice';
import authReducer from '../../entities/user/model/authSlice';
export const store = configureStore({
  reducer: {
    like: likeReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
