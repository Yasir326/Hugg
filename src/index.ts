import fastify from 'fastify';
import { routes } from './routes/routes';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { safeAwait } from './utils/safeAwait';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import authPlugin from './plugins/auth';

const server = fastify().withTypeProvider<TypeBoxTypeProvider>();

server.register(authPlugin);


//Ideally this should be in a docs folder but I'm running out of time
server.register(swagger, {
  openapi: {
    info: {
      title: 'Yasir\'s Hugg API 🧸',
      description: 'API for accessing brand, product, and store information',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
  }
});

server.register(swaggerUI, {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false
  }
});

server.register(routes);

const start = async () => {

  const [error, port] = await safeAwait(server.listen({ port: 3000 }));

  if (error) {
    console.error(error);
    process.exit(1);
  }

  console.log(`Server is running on port ${port}`);

  process.on('unhandledRejection', (err) => {
    console.error('Unhandled rejection:', err);
    process.exit(1);
  });
}

start();
