import { Type } from '@sinclair/typebox';

export const PaginationSchema = Type.Object({
  total: Type.Number(),
  page: Type.Number(),
  limit: Type.Number(),
  totalPages: Type.Number()
});
