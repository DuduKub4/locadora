import { FastifyRequest, FastifyReply } from 'fastify';
import { AppError } from '../../../../errors/AppError';
import { CreateMovieUseCase } from './CreateMovieUseCase';
import { CreateMovieDTO } from '../../dtos/CreateMovieDTO';

export class CreateMovieController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { title, duration, release_date } = request.body as CreateMovieDTO;

    const createMovieUseCase = new CreateMovieUseCase();

    try {
      const result = await createMovieUseCase.execute({
        title,
        duration,
        release_date,
      });

      reply.status(201).send(result);
    } catch (error: unknown) {
      if (error instanceof AppError) {
        reply.status(error.statusCode).send({
          status: 'error',
          message: error.message,
        });
      } else {
        console.error(error); // Log the error for debugging purposes
        reply.status(500).send({
          status: 'error',
          message: `Internal server error - ${(error as Error).message || 'Unknown error'}`,
        });
      }
    }
  }
}
