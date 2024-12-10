import type { z } from 'zod';
import type { favoriteFormSchema, favoriteSchema } from './favorites.schema';

export type FavoriteType = z.infer<typeof favoriteSchema>;
export type FavoriteFormDataType = z.infer<typeof favoriteFormSchema>;
export type FavoriteSliceType = {
  items: FavoriteType[];
  error: string | null;
  selected: FavoriteType | null;
};
