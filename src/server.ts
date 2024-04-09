import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { AppError } from './errors/AppError';
import { PrismaClient } from '@prisma/client';

const fastify = require('fastify')({ logger: true });
const Prisma = new PrismaClient();

fastify.register(require('fastify-cors'));

fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'Locadora API',
      description: 'Documentação da API da Locadora',
      version: '1.0.0',
    },
  },
});

// Função para validar os dados de entrada
const validateUserData = (userData: any) => {
  if (!userData || typeof userData.name !== 'string' || typeof userData.email !== 'string') {
    throw new AppError('Invalid request data', 400);
  }
};

fastify.post('/users', async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    // Validar os dados da solicitação
    validateUserData(request.body);

    const { name, email } = request.body as { name: string, email: string };

    // Criar o usuário no banco de dados
    const user = await Prisma.user.create({ data: { name, email } });
    reply.send(user);
  } catch (error: any) {
    if (error instanceof AppError) {
      reply.status(error.statusCode).send({
        status: 'error',
        message: error.message,
      });
    } else {
      console.error(error); // Log the error for debugging purposes
      reply.status(500).send({
        status: 'error',
        message: `Internal server error - ${(error && error.message) || 'Unknown error'}`,
      });
    }
  }
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3333;

fastify.listen(PORT, '0.0.0.0', (err: Error, address: string) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server is running on ${address}`);
});
