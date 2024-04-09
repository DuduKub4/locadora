import { PrismaClient, User } from '@prisma/client';

export class GetAllUsersUseCase {
  async execute(): Promise<User[]> {
    const prisma = new PrismaClient(); // Criar uma instância do PrismaClient

    try {
      const users = await prisma.user.findMany({
        include: {
          movieRents: {
            select: {
              movie: {
                select: {
                  title: true,
                },
              },
            },
          },
        },
      });

      return users;
    } catch (error) {
      throw new Error("Failed to fetch all users");
    } finally {
      await prisma.$disconnect(); // Desconectar o PrismaClient quando não estiver mais em uso
    }
  }
}
