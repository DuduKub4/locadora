import { AppError } from "../../../../errors/AppError";
import { PrismaClient } from '@prisma/client';
import { CreateMovieRentDTO } from "../../dtos/CreateMovieRentDTO";

export class CreateMovieRentUseCase {
  async execute({ movieId, userId }: CreateMovieRentDTO): Promise<void> {
    const prisma = new PrismaClient(); // Criar uma instância do PrismaClient

    try {
      // Verificar se o filme existe
      const movieExists = await prisma.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!movieExists) {
        throw new AppError("Movie does not exist!");
      }

      // Verificar se o filme já está alugado
      const movieAlreadyRented = await prisma.movieRent.findFirst({
        where: {
          movieId,
        },
      });

      if (movieAlreadyRented) {
        throw new AppError("Movie already rented!");
      }

      // Verificar se o usuário existe
      const userExists = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!userExists) {
        throw new AppError("User does not exist!");
      }

      // Criar a locação
      await prisma.movieRent.create({
        data: {
          movieId,
          userId,
        },
      });
    } catch (error) {
      throw new AppError("Failed to create movie rent");
    } finally {
      await prisma.$disconnect(); // Desconectar o PrismaClient quando não estiver mais em uso
    }
  }
}
