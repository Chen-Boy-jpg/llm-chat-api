import { FastifyInstance } from "fastify";

import {
  createSessionSchema,
  deleteSessionSchema,
  getSessionsSchema,
} from "../schemas/session.schema";
import { updateSessionSchema } from "../schemas/session.schema.js";
import { getSessionSchema } from "../schemas/session.schema.js";
import {
  createSession,
  deleteSession,
  findSessionById,
  getSessions,
} from "../services/session.service";
import { updateSession } from "../services/session.service.js";
import { getSession } from "../services/session.service.js";

export default async function sessionRoutes(app: FastifyInstance) {
  app.post("/sessions", createSessionSchema, async (request, reply) => {
    const body = request.body as {
      title: string;
    };
   
    const session = await createSession(body.title);


    return reply.code(201).send(session);
  });

  app.get("/sessions", getSessionsSchema, async () => {
    return getSessions();
  });

  app.get(
    "/sessions/:sessionId",

    {
      ...getSessionSchema,
    },

    async (request, reply) => {
      const { sessionId } = request.params as {
        sessionId: string;
      };

      const session = await getSession(sessionId);

      if (!session) {
        return reply.status(404).send({
          message: "Session not found",
        });
      }

      return reply.status(200).send(session);
    },
  );

  app.delete("/sessions/:id", deleteSessionSchema, async (request, reply) => {
    const { id } = request.params as {
      id: string;
    };

    const session = await findSessionById(id);

    if (!session) {
      return reply.code(404).send({
        error: "Session not found",
      });
    }

    await deleteSession(id);

    return reply.code(204).send();
  });

  app.patch(
    "/sessions/:sessionId",

    {
      ...updateSessionSchema,
    },

    async (request, reply) => {
      const { sessionId } = request.params as {
        sessionId: string;
      };

      const { title } = request.body as {
        title: string;
      };

      const session = await updateSession(sessionId, title);

      return reply.status(200).send(session);
    },
  );
}
