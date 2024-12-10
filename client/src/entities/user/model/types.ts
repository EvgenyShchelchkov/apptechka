import type { z } from 'zod';
import type {
  authResponseSchema,
  signinFromSchema,
  signupFromSchema,
  userSchema,
} from './auth.schema';

export type UserType = z.infer<typeof userSchema>;
export type signupFromType = z.infer<typeof signupFromSchema>;
export type signinFromType = z.infer<typeof signinFromSchema>;
export type authResponseType = z.infer<typeof authResponseSchema>;

export type AuthSliceType = {
  user: UserType | null;
  accessToken: string | null;
  error: string | null;
};
