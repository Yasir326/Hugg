import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import jwt from '@fastify/jwt';
import fp from 'fastify-plugin';
import { safeAwait } from '../utils/safeAwait';

export default fp(async function (fastify: FastifyInstance) {
  fastify.register(jwt, {
    secret: process.env.JWT_SECRET || 'super_secret_key_which_in_a_real_app_would_be_stored_in_ssm',
  })

  fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    const [error] = await safeAwait(request.jwtVerify());
    
    if (error) {
      reply.code(401).send({ 
        message: 'Unauthorized - Invalid or missing token',
        error: error.message
      });
    }
  });
});

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

