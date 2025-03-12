import { FastifyRequest, FastifyReply } from 'fastify';
import { getProductsForBrand } from '../../src/controllers/brandController';
import { getProductsByBrandId } from '../../src/models/brandModel';

jest.mock('../../src/models/brandModel');

describe('Brand Controller', () => {
  let mockRequest: Partial<FastifyRequest>;
  let mockReply: Partial<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockRequest = {
      params: { id: '5a4e6d14-53d4-4583-bd6b-49f81b021d24' },
      query: { page: 1, limit: 10 },
    };

    mockReply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
  });

  describe('getProductsForBrand', () => {
    it('should return products when found', async () => {
      const mockProducts = {
        data: [
          {
            id: '5a3fe6f7-7796-44ca-84fe-70d4f751527d',
            created_at: '2019-06-03 11:16:00',
            updated_at: '2019-06-03 12:16:00',
            brand_id: '5a4e6d14-53d4-4583-bd6b-49f81b021d24',
            description: 'One standard cinema ticket.',
            campaign: null,
            label: 'One Cinema Ticket',
            internal_name: '',
            integration: '',
            price: '8.00',
            over_18_offer: 0,
            redemption_instructions:
              "Present your QR code at the Vue Cinema counter. Please ensure cashier knows these are 'Movie Money' e-codes. Your app must be updated to 3.2.0 or later.",
            image: 'ar2d335e7609aa464cfdb83f40d1120f1397aabcf4.png',
            subtitle: 'the UK',
            weight: 95964872,
            recipient_description:
              'Swap this huggg for one standard cinema ticket at the Vue Cinemas counter.',
            tag_group_id: '',
            tag_id: '',
            open_graph_image: 'arcb57e94877887f221446db87444768f02c706589.png',
            active: 1,
            on_app: 1,
            on_imessage: 1,
            handling_fee: 20,
            sale_price: 800,
            huggg_tag: null,
            vat_voucher_type: 'SPV',
            vat: null,
            brand_name: 'Vue Cinemas',
            brand_weight: 5000,
            image_url:
              'https://test.huggg.me/offers/ar2d335e7609aa464cfdb83f40d1120f1397aabcf4.png',
            claim_image: 'ar2d335e7609aa464cfdb83f40d1120f1397aabcf4.png',
            claim_image_url:
              'https://test.huggg.me/offers/ar2d335e7609aa464cfdb83f40d1120f1397aabcf4.png',
            imessage_image: 'ar2d335e7609aa464cfdb83f40d1120f1397aabcf4.png',
            imessage_image_url:
              'https://test.huggg.me/offers/ar2d335e7609aa464cfdb83f40d1120f1397aabcf4.png',
            open_graph_image_url:
              'https://test.huggg.me/offers/arcb57e94877887f221446db87444768f02c706589.png',
          },
        ],
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1
      };

      (getProductsByBrandId as jest.Mock).mockResolvedValue(mockProducts);

      await getProductsForBrand(
        mockRequest as FastifyRequest<{ Params: { id: string }; Querystring: { page: number; limit: number } }>,
        mockReply as FastifyReply
      );

      expect(getProductsByBrandId).toHaveBeenCalledWith(
        '5a4e6d14-53d4-4583-bd6b-49f81b021d24',
        1,
        10
      );
      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith(mockProducts);
    });

    it('should return 404 when no products found', async () => {
      const emptyResponse = {
        data: [],
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0
      };
      (getProductsByBrandId as jest.Mock).mockResolvedValue(emptyResponse);

      await getProductsForBrand(
        mockRequest as FastifyRequest<{ Params: { id: string }; Querystring: { page: number; limit: number } }>,
        mockReply as FastifyReply
      );

      expect(getProductsByBrandId).toHaveBeenCalledWith(
        '5a4e6d14-53d4-4583-bd6b-49f81b021d24',
        1,
        10
      );
      expect(mockReply.code).toHaveBeenCalledWith(404);
      expect(mockReply.send).toHaveBeenCalledWith({
        message: 'No products found for brand with ID 5a4e6d14-53d4-4583-bd6b-49f81b021d24',
      });
    });

    it('should return 500 when an error occurs', async () => {
      (getProductsByBrandId as jest.Mock).mockRejectedValue(
        new Error('Database error')
      );

      await getProductsForBrand(
        mockRequest as FastifyRequest<{ Params: { id: string }; Querystring: { page: number; limit: number } }>,
        mockReply as FastifyReply
      );

      expect(getProductsByBrandId).toHaveBeenCalledWith(
        '5a4e6d14-53d4-4583-bd6b-49f81b021d24',
        1,
        10
      );
      expect(mockReply.code).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({
        message: 'Failed to fetch products for brand with ID 5a4e6d14-53d4-4583-bd6b-49f81b021d24',
      });
    });
  });
});
