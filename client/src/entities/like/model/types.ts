import type { z } from 'zod';
import type { likeFormSchema, likeSchema } from './like.schema';

export type LikeType = z.infer<typeof likeSchema>;
export type LikeFormDataType = z.infer<typeof likeFormSchema>;
export type LikeSliceType = {
  items: LikeType[];
  error: string | null;
  selected: LikeType | null;
};
