import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateUserUseCase } from './CreateUserUseCase';
import { AppError } from '../../../../errors/AppError';

export class CreateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, email } = request.body as { name: string, email: string };

    const createUserUseCase = new CreateUserUseCase();

    try {
      const result = await createUserUseCase.execute({ name, email });
      reply.status(201).send(result);
    } catch (error: any) {
      if (error instanceof AppError) {
        reply.status(error.statusCode).send({
          status: 'error',
          message: error.message,
        });
      } else {
        console.error(error); // Log the error for debugging purposes
        reply.status(500).send({
          status: 'error',
          message: `Internal server error - ${error.message || 'Unknown error'}`,
        });
      }
    }
  }
}
