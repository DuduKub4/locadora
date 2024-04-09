import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateMovieRentUseCase } from './CreateMovieRentUseCase';

interface CreateMovieRentRequest {
  movieId: string;
  userId: string;
}

export class CreateMovieRentController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { movieId, userId } = request.body as CreateMovieRentRequest;

    const createMovieRentUseCase = new CreateMovieRentUseCase();

    await createMovieRentUseCase.execute({ movieId, userId });

    reply.status(201).send();
  }
}
