import { FastifyInstance } from "fastify";

import prisma from "../lib/prisma.js";

export default async function lifecycle(app: FastifyInstance) {
  app.addHook("onReady", async () => {
    const maxAttempts = 10;
    let attempt = 0;

    while (attempt < maxAttempts) {
      try {
        await prisma.$connect();
        app.log.info("Database connected");
        return;
      } catch (error) {
        attempt += 1;

        if (attempt >= maxAttempts) {
          app.log.error(error, "Database connection failed after retries");
          throw error;
        }

        app.log.warn(`Database not ready yet, retrying in 2s (${attempt}/${maxAttempts})`);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }
  });

  app.addHook("onClose", async () => {
    await prisma.$disconnect();

    app.log.info("Database disconnected");
  });
}
