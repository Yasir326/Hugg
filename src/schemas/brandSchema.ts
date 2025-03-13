import { Type } from '@sinclair/typebox';
import { ErrorResponseSchema } from './errorSchema';
import { PaginationSchema } from './paginationSchema';

export const BrandParamsSchema = Type.Object({
  id: Type.String()
});

export const PaginationQuerySchema = Type.Object({
  page: Type.Optional(Type.Number({ default: 1 })),
  limit: Type.Optional(Type.Number({ default: 20 }))
});

export const ProductSchema = Type.Object({
  id: Type.String(),
  created_at: Type.String(),
  updated_at: Type.String(),
  brand_id: Type.String(),
  description: Type.String(),
  campaign: Type.Union([Type.String(), Type.Null()]),
  label: Type.String(),
  internal_name: Type.String(),
  integration: Type.String(),
  price: Type.String(),
  over_18_offer: Type.Number(),
  redemption_instructions: Type.String(),
  image: Type.String(),
  subtitle: Type.String(),
  weight: Type.Number(),
  recipient_description: Type.String(),
  tag_group_id: Type.String(),
  tag_id: Type.String(),
  open_graph_image: Type.String(),
  active: Type.Number(),
  on_app: Type.Number(),
  on_imessage: Type.Number(),
  handling_fee: Type.Number(),
  sale_price: Type.Number(),
  huggg_tag: Type.Union([Type.String(), Type.Null()]),
  vat_voucher_type: Type.String(),
  vat: Type.Union([Type.String(), Type.Null()]),
  brand_name: Type.String(),
  brand_weight: Type.Number(),
  image_url: Type.String(),
  claim_image: Type.String(),
  claim_image_url: Type.String(),
  imessage_image: Type.String(),
  imessage_image_url: Type.String(),
  open_graph_image_url: Type.String()
});


export const PaginatedProductsResponseSchema = Type.Object({
  data: Type.Array(ProductSchema),
  pagination: PaginationSchema
});

// Route schemas
export const getProductsForBrandSchema = {
  tags: ['brands'],
  description: 'Get all products for a brand by brand ID',
  params: BrandParamsSchema,
  querystring: PaginationQuerySchema,
  response: {
    200: PaginatedProductsResponseSchema,
    404: ErrorResponseSchema,
    500: ErrorResponseSchema
  }
}; 