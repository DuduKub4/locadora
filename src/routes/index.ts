import { FastifyInstance } from 'fastify';
import { movieRoutes } from './movie.routes';
import { userRoutes } from './user.routes';

export const routes = async (fastify: FastifyInstance) => {
  fastify.register(userRoutes, { prefix: '/users' });
  fastify.register(movieRoutes, { prefix: '/movies' });
};
