import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../api/auth.service';
import { signinFromSchema, signupFromSchema } from './auth.schema';

export const signinThunk = createAsyncThunk('auth/signin', (formData: FormData) => {
  const data = Object.fromEntries(formData);
  return authService.signin(signinFromSchema.parse(data));
});

export const signupThunk = createAsyncThunk('auth/signup', (formData: FormData) => {
  const data = Object.fromEntries(formData);
  return authService.signup(signupFromSchema.parse(data));
});

export const signoutThunk = createAsyncThunk('auth/signout', () => authService.signout());

export const refreshThunk = createAsyncThunk('auth/refresh', () => authService.refresh());
