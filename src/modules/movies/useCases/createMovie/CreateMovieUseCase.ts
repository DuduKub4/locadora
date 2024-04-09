import { Movie } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { PrismaClient } from '@prisma/client';
import { CreateMovieDTO } from "../../dtos/CreateMovieDTO";

export class CreateMovieUseCase {
  async execute({
    title,
    duration,
    release_date,
  }: CreateMovieDTO): Promise<Movie> {
    const prisma = new PrismaClient(); // Criar uma instância do PrismaClient

    try {
      // Verificar se o filme já existe
      const movieAlreadyExists = await prisma.movie.findUnique({
        where: {
          title,
        },
      });

      if (movieAlreadyExists) {
        throw new AppError("Movie already exists!", 400); // Adicionei o código de status 400
      }

      // Criar o filme
      const movie = await prisma.movie.create({
        data: {
          title,
          duration,
          release_date,
        },
      });

      return movie;
    } catch (error: unknown) {
      // Tratamento de erros
      if (error instanceof AppError) {
        throw error; // Lançar o erro customizado para ser tratado pelo controlador
      } else {
        console.error("Failed to create movie:", error); // Log do erro para fins de depuração
        throw new AppError("Failed to create movie", 500); // Lançar um erro genérico
      }
    } finally {
      // Certificar-se de que o PrismaClient é desconectado, mesmo em caso de erro
      await prisma.$disconnect().catch(console.error); // Logar qualquer erro ao desconectar
    }
  }
}
