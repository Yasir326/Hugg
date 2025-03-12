import { FastifyReply } from 'fastify';
import { FastifyRequest } from 'fastify';
import { getProductsByBrandId } from '../models/brandModel';
import { safeAwait } from '../utils/safeAwait';
import { getProductsForBrandSchema } from '../schemas/brandSchema';
import { PaginatedResponse, PaginationQuery, Product } from '../types';

interface BrandParams {
  id: string;
};

/**
 * Get products by brand ID
 * @route GET /api/brands/:id/products
 */
export const getProductsForBrand = async (
  request: FastifyRequest<{ Params: BrandParams; Querystring: PaginationQuery }>,
  reply: FastifyReply
): Promise<FastifyReply> => {
    const { id } = request.params;
    const { page, limit } = request.query;
    const [error, products] = await safeAwait<PaginatedResponse<Product>>(getProductsByBrandId(id, page, limit));
    
    if (error) {
    return reply.code(500).send({ message: `Failed to fetch products for brand with ID ${id}` });
    }
    
    if (!products || products.data.length === 0) {
      return reply.code(404).send({ message: `No products found for brand with ID ${id}` });
    }
    
    return reply.code(200).send(products);
};

export const schema = {
  getProductsForBrand: getProductsForBrandSchema
};