import { Type } from '@sinclair/typebox';
import { ErrorResponseSchema } from './errorSchema';
import { PaginationQuerySchema } from './brandSchema';

// Product schemas
export const ProductParamsSchema = Type.Object({
  id: Type.String()
});

export const StoreSchema = Type.Object({
  id: Type.String(),
  brand_id: Type.String(),
  latitude: Type.String(),
  longitude: Type.String(),
  website: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  name: Type.String(),
  description: Type.String(),
  visible: Type.Number(),
  description_markdown: Type.String(),
  image: Type.String(),
  image_url: Type.String()
});

export const PaginationSchema = Type.Object({
  total: Type.Number(),
  page: Type.Number(),
  limit: Type.Number(),
  totalPages: Type.Number()
});

export const PaginatedStoresResponseSchema = Type.Object({
  data: Type.Array(StoreSchema),
  pagination: PaginationSchema
});

export const getStoresByProductIdSchema = {
  tags: ['products'],
  description: 'Get all stores for a product by product ID',
  params: ProductParamsSchema,
  querystring: PaginationQuerySchema,
  response: {
    200: PaginatedStoresResponseSchema,
    404: ErrorResponseSchema,
    500: ErrorResponseSchema
  }
}; 