import { z } from 'zod';

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
});

export const authResponseSchema = z.object({
  user: userSchema,
  accessToken: z.string(),
});

export const signupFromSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const signinFromSchema = signupFromSchema.omit({ name: true });
