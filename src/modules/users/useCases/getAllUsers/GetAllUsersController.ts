import { FastifyRequest, FastifyReply } from 'fastify';
import { GetAllUsersUseCase } from './GetAllUsersUseCase';

export class GetAllUsersController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const getAllUsersUseCase = new GetAllUsersUseCase();

    const result = await getAllUsersUseCase.execute();

    reply.status(200).send(result);
  }
}
