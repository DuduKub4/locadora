import { FastifyInstance } from 'fastify';
import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController';
import { GetAllUsersController } from '../modules/users/useCases/getAllUsers/GetAllUsersController';

const createUserController = new CreateUserController();
const getAllUsersController = new GetAllUsersController();

export const userRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/', createUserController.handle);
  fastify.get('/', getAllUsersController.handle);
};
