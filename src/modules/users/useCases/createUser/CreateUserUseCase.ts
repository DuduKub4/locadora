import { PrismaClient, User } from '@prisma/client';
import { AppError } from '../../../../errors/AppError';
import { CreateUserDTO } from '../../dtos/CreateUserDTO';

export class CreateUserUseCase {
  async execute({ name, email }: CreateUserDTO): Promise<User> {
    const prisma = new PrismaClient(); // Criar uma instância do PrismaClient

    try {
      // Verificar se o usuário já existe
      const userAlreadyExists = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (userAlreadyExists) {
        throw new AppError("User already exists!");
      }

      // Criar o usuário
      const user = await prisma.user.create({
        data: {
          name,
          email,
        },
      });

      return user;
    } catch (error) {
      throw new AppError("Failed to create user");
    } finally {
      await prisma.$disconnect(); // Desconectar o PrismaClient quando não estiver mais em uso
    }
  }
}
