import { Movie } from "@prisma/client";
import { PrismaClient } from '@prisma/client';

export class GetMoviesByReleaseDateUseCase {
  async execute(): Promise<Movie[]> {
    const prisma = new PrismaClient(); // Criar uma instância do PrismaClient

    try {
      const movies = await prisma.movie.findMany({
        orderBy: {
          release_date: "desc",
        },
        include: {
          movieRents: {
            select: {
              user: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
      });

      return movies;
    } catch (error) {
      throw new Error("Failed to fetch movies by release date");
    } finally {
      await prisma.$disconnect(); // Desconectar o PrismaClient quando não estiver mais em uso
    }
  }
}
