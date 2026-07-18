import { FastifyInstance } from "fastify";

export default async function errorHandler(app: FastifyInstance) {
  app.setErrorHandler(async (error, request, reply) => {
    request.log.error(error);

    if (error instanceof Error) {
      return reply.status(500).send({
        error: "Internal Server Error",
        message: error.message,
      });
    }

    return reply.status(500).send({
      error: "Internal Server Error",
      message: "Unknown error occurred",
    });
  });
}
