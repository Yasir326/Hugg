import { FastifyRequest, FastifyReply } from 'fastify';
import { safeAwait } from '../utils/safeAwait';
import { getStoresByProductId as getStoresByProductIdModel } from '../models/productModel';
import { getStoresByProductIdSchema } from '../schemas/productSchema';
import { PaginatedResponse, PaginationQuery, Store } from '../types';

interface ProductParams {
  id: string;
}
/**
 * Get stores by product ID
 * @route GET /api/products/:id/stores
 */
export const getStoresByProductId = async (
  request: FastifyRequest<{ Params: ProductParams; Querystring: PaginationQuery }>,
  reply: FastifyReply
): Promise<FastifyReply> => {
  const { id } = request.params;
  const { page, limit } = request.query;
  const [error, stores] = await safeAwait<PaginatedResponse<Store>>(getStoresByProductIdModel(id, page, limit));

  if (error) {
    return reply.code(500).send({ message: `Failed to fetch stores for product with ID ${id}` });
  }

  if (!stores || stores.data.length === 0) {
    return reply.code(404).send({ message: `No stores found for product with ID ${id}` });
  }

  return reply.code(200).send(stores);
};

export const schema = {
  getStoresByProductId: getStoresByProductIdSchema
};