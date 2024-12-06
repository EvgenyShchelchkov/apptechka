/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { refreshThunk, signinThunk, signoutThunk, signupThunk } from './authThunks';
import type { AuthSliceType } from './types';

const initialState: AuthSliceType = {
  user: null,
  error: null,
  accessToken: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setClearError: (state) => {
      state.error = null;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signinThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(signinThunk.rejected, (state, action) => {
        state.error = action.error.message ?? 'Ошибка авторизации!';
      });
    builder
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.error = action.error.message ?? 'Ошибка регистрации!';
      });
    builder
      .addCase(signoutThunk.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
      })
      .addCase(signoutThunk.rejected, (state, action) => {
        state.error = action.error.message ?? 'Ошибка выхода!';
      });
    builder
      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(refreshThunk.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
      });
  },
});

export const { setClearError, setAccessToken } = authSlice.actions;

export default authSlice.reducer;
