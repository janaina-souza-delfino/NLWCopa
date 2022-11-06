import Fastify from "fastify"; // Fastify é um framework para Node.js que permite criar APIs REST de forma simples e rápida.
import { PrismaClient } from "@prisma/client";
import cors from "@fastify/cors";

const prisma = new PrismaClient({
  log: ["query"],
});
async function bootstrap() {
  const fastify = Fastify({
    logger: true, // Habilita o log de requisições no console do servidor Node.js
  });

  await fastify.register(cors, {
    origin: true,
  });

  fastify.get("/pools/count", async () => {
    // Cria uma rota GET para o endereço /pools/count

    // const pools = await prisma.pool.findMany({ // exemplo de consulta para encontrar todos os pools que começam com a letra tal.
    //     where: {
    //         code: {
    //             startsWith: 'B'
    //         }
    //     }
    // })
    // return { pools }

    const count = await prisma.pool.count(); // método count() retorna a quantidade de pools cadastrados no banco de dados.
    return { count };
  });

  await fastify.listen({ port: 3333 /*host: '0.0.0.0'*/ }); // Inicia o servidor na porta 3333
}

bootstrap(); // Inicia o servidor
