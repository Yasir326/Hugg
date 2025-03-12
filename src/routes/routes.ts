import { FastifyInstance } from 'fastify';
import { getProductsForBrand, schema as brandSchema } from '../controllers/brandController';
import { getStoresByProductId, schema as productSchema } from '../controllers/productsController';

/**
 * Routes for the API
 * @param fastify - The fastify instance
 */

export async function routes(fastify: FastifyInstance) {
  
  fastify.get<{ Params: { id: string }; Querystring: { page?: number; limit?: number } }>(
    '/api/brands/:id/products',
    { schema: brandSchema.getProductsForBrand, preHandler: fastify.authenticate },
    getProductsForBrand
  );

  fastify.get<{ Params: { id: string }; Querystring: { page?: number; limit?: number } }>(
    '/api/products/:id/stores',
    { schema: productSchema.getStoresByProductId, preHandler: fastify.authenticate },
    getStoresByProductId
  );

  fastify.get('/', async (_, reply) => {
    reply.code(200).send({ message: 'Welcome to Yasir\'s implementation of Hugg Technical Task 👋🏼 🚀🚀', 
      routes: [
        {
          method: 'GET',
          path: '/api/brands/:id/products',
          description: 'Get products for a brand'
        },
        {
          method: 'GET',
          path: '/api/products/:id/stores',
          description: 'Get stores for a product'
        },
        {
          method: 'GET',
          path: '/documentation',
          description: 'Get the documentation'
        },
      ]
    });
  });

    fastify.post('/login', {
      schema: {
        body: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: { type: 'string' },
            password: { type: 'string' }
          }
        }
      }
    }, async (request, reply) => {
      const { username, password } = request.body as { username: string, password: string };
      
      /**
       * was running out of time so I'm using a hardcoded username and password
       *  again this would be stored in a database and hashed then validated
       */
      if (username === 'hugg' && password === 'huggmeimscared') {
        const token = fastify.jwt.sign({ 
          username,
          role: 'admin'
        }, { 
          expiresIn: '1h' 
        });
        
        return { token };
      }
      
      reply.code(401).send({ message: 'Invalid credentials' });
    });
}
