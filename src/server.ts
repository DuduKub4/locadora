import fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { AppError } from './errors/AppError';
import { routes } from './routes';

const app: FastifyInstance = fastify();

app.register(routes);

app.setErrorHandler(async (error: Error, request: FastifyRequest, reply: FastifyReply) => {
  if (error instanceof AppError) {
    reply.status(error.statusCode).send({
      status: 'error',
      message: error.message,
    });
  } else {
    console.error(error); // Log the error for debugging purposes
    reply.status(500).send({
      status: 'error',
      message: `Internal server error - ${error.message}`,
    });
  }
});

app.listen(3333, () => console.log("Server is running in port 3333 🚀"));
