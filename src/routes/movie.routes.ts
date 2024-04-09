import { FastifyInstance } from 'fastify';
import { CreateMovieController } from '../modules/movies/useCases/createMovie/CreateMovieController';
import { CreateMovieRentController } from '../modules/movies/useCases/createMovieRent/CreateMovieRentController';
import { GetMoviesByReleaseDateController } from '../modules/movies/useCases/getMoviesByReleaseDate/GetMoviesByReleaseDateController';

const createMovieController = new CreateMovieController();
const getMoviesByReleaseDateController = new GetMoviesByReleaseDateController();
const createMovieRentController = new CreateMovieRentController();

export const movieRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/', createMovieController.handle);
  fastify.get('/release', getMoviesByReleaseDateController.handle);
  fastify.post('/rent', createMovieRentController.handle);
};
