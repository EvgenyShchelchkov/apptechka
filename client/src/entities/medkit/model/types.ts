import type { z } from 'zod';
import type { bookFormSchema, bookSchema } from './medkit.schema';

export type BookType = z.infer<typeof bookSchema>;
export type BookFormDataType = z.infer<typeof bookFormSchema>;
export type SortableKeysType = 'title' | 'userId' | 'createdAt';
export type BookSliceType = {
  items: BookType[];
  error: string | null;
  sort: {
    key: SortableKeysType;
    order: 'asc' | 'desc';
  };
  selected: BookType | null;
};
