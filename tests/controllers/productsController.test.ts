import { FastifyRequest, FastifyReply } from 'fastify';
import { getStoresByProductId } from '../../src/controllers/productsController';
import { getStoresByProductId as getStoresByProductIdModel } from '../../src/models/productModel';

jest.mock('../../src/models/productModel');

describe('Products Controller', () => {
  let mockRequest: Partial<FastifyRequest>;
  let mockReply: Partial<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockRequest = {
      params: { id: '26f7a82a-30a8-44e4-93cb-499a256d0ce9' },
      query: { page: 1, limit: 10 },
    };

    mockReply = {
      code: jest.fn().mockReturnThis() as any,
      send: jest.fn().mockReturnThis() as any,
    };
  });

  describe('getStoresByProductId', () => {
    it('should return stores when found', async () => {
      const mockStores = {
        data: [
          {
            id: '120cad4a-d5ed-4e69-9619-193943518a64',
            brand_id: '69be9b8c-5b95-4792-a05c-652d2f15a62f',
            latitude: '51.514858',
            longitude: '-0.097494',
            name: "Taylor St. Baristas (St Paul's)",
            description: 'Artisan coffee at its best.',
            visible: 1,
            description_markdown: '',
            image: 'are11946747092e3cac7f0f62755270f761620cc22.png',
            image_url:
              'https://cdn.huggg.me/locations/are11946747092e3cac7f0f62755270f761620cc22.png',
            website: null,
          },
          {
            id: '1236a970-8e75-4c35-8aa6-1e37e204f334',
            brand_id: 'a715b837-f4fc-48ba-ba0a-7f53b6dc59c5',
            latitude: '51.504108',
            longitude: '-0.114614',
            name: 'Crosstown Doughnuts (Waterloo)',
            description:
              'Does not accept Coffee Anywhere. Fresh handcrafted doughnuts.',
            visible: 1,
            description_markdown: '',
            image: 'ar388d0482c0da0500f78af4e0ddc9db1f6cd3aa81.png',
            image_url:
              'https://cdn.huggg.me/locations/ar388d0482c0da0500f78af4e0ddc9db1f6cd3aa81.png',
            website: null,
          },
        ],
        total: 2,
        page: 1,
        limit: 10,
        totalPages: 1,
      };

      (getStoresByProductIdModel as jest.Mock).mockResolvedValue(mockStores);

      await getStoresByProductId(
        mockRequest as FastifyRequest<{
          Params: { id: string };
          Querystring: { page: number; limit: number };
        }>,
        mockReply as FastifyReply
      );

      expect(getStoresByProductIdModel).toHaveBeenCalledWith(
        '26f7a82a-30a8-44e4-93cb-499a256d0ce9',
        1,
        10
      );
      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith(mockStores);
    });

    it('should return 404 when no stores found', async () => {
      const emptyResponse = {
        data: [],
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
      };

      (getStoresByProductIdModel as jest.Mock).mockResolvedValue(emptyResponse);

      await getStoresByProductId(
        mockRequest as FastifyRequest<{
          Params: { id: string };
          Querystring: { page: number; limit: number };
        }>,
        mockReply as FastifyReply
      );

      expect(getStoresByProductIdModel).toHaveBeenCalledWith(
        '26f7a82a-30a8-44e4-93cb-499a256d0ce9',
        1,
        10
      );
      expect(mockReply.code).toHaveBeenCalledWith(404);
      expect(mockReply.send).toHaveBeenCalledWith({
        message:
          'No stores found for product with ID 26f7a82a-30a8-44e4-93cb-499a256d0ce9',
      });
    });

    it('should return 500 when an error occurs', async () => {
      (getStoresByProductIdModel as jest.Mock).mockRejectedValue(
        new Error('Database error')
      );

      await getStoresByProductId(
        mockRequest as FastifyRequest<{
          Params: { id: string };
          Querystring: { page: number; limit: number };
        }>,
        mockReply as FastifyReply
      );

      expect(getStoresByProductIdModel).toHaveBeenCalledWith(
        '26f7a82a-30a8-44e4-93cb-499a256d0ce9', 
        1,
        10
      );
      expect(mockReply.code).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({
        message:
          'Failed to fetch stores for product with ID 26f7a82a-30a8-44e4-93cb-499a256d0ce9',
      });
    });
  });
});
