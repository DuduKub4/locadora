import { FastifyRequest, FastifyReply } from 'fastify';
import { GetMoviesByReleaseDateUseCase } from './GetMoviesByReleaseDateUseCase';

export class GetMoviesByReleaseDateController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const getMoviesByReleaseDateUseCase = new GetMoviesByReleaseDateUseCase();

    try {
      const result = await getMoviesByReleaseDateUseCase.execute();

      reply.status(200).send(result);
    } catch (error: any) {
      console.error(error); // Log the error for debugging purposes
      reply.status(500).send({
        status: 'error',
        message: `Internal server error - ${error.message || 'Unknown error'}`,
      });
    }
  }
}
