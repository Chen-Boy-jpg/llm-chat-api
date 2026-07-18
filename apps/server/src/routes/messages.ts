import { FastifyInstance } from "fastify";

import {
  createMessageSchema,
  getMessagesSchema,
  streamMessageSchema,
} from "../schemas/message.schema.js";
import { generateReply, streamReply } from "../services/llm.service.js";
import {
  createAssistantMessage,
  createUserMessage,
  getMessages,
} from "../services/message.service.js";

export default async function messageRoutes(app: FastifyInstance) {
  // Normal chat API
  app.post(
    "/sessions/:sessionId/messages",
    {
      ...createMessageSchema,
    },
    async (request, reply) => {
      const { sessionId } = request.params as {
        sessionId: string;
      };

      const { content } = request.body as {
        content: string;
      };

      const userMessage = await createUserMessage(sessionId, content);

      const history = await getMessages(sessionId);

      const messages = history.map((item) => ({
        role: item.role,

        content: item.content,
      }));

      const replyText = await generateReply(messages);

      const assistantMessage = await createAssistantMessage(sessionId, replyText);

      return reply.status(201).send({
        userMessage,

        assistantMessage,
      });
    },
  );

  // Get messages
  app.get(
    "/sessions/:sessionId/messages",
    {
      ...getMessagesSchema,
    },
    async (request, reply) => {
      const { sessionId } = request.params as {
        sessionId: string;
      };

      const messages = await getMessages(sessionId);

      return reply.status(200).send(messages);
    },
  );

  // SSE Streaming API
  app.post(
    "/sessions/:sessionId/messages/stream",
    {
      ...streamMessageSchema,
    },
    async (request, reply) => {
      const { sessionId } = request.params as {
        sessionId: string;
      };

      const { content } = request.body as {
        content: string;
      };

      try {
        // 1. Save user message

        await createUserMessage(sessionId, content);

        // 2. Get conversation history

        const history = await getMessages(sessionId);

        const messages = history.map((item) => ({
          role: item.role,

          content: item.content,
        }));

        // 3. SSE headers

        reply.raw.setHeader("Content-Type", "text/event-stream");

        reply.raw.setHeader("Cache-Control", "no-cache");

        reply.raw.setHeader("Connection", "keep-alive");

        reply.raw.flushHeaders();

        // 4. Start LLM stream

        const stream = await streamReply(messages);

        let assistantContent = "";

        // 5. Send tokens

        for await (const chunk of stream) {
          const token = chunk.choices[0]?.delta?.content;

          if (!token) {
            continue;
          }

          assistantContent += token;

          reply.raw.write(`data: ${token}\n\n`);
        }

        // 6. Save assistant response

        await createAssistantMessage(sessionId, assistantContent);

        // 7. Finish SSE

        reply.raw.write("data: [DONE]\n\n");

        reply.raw.end();
      } catch (error) {
        request.log.error(error);

        // Header 尚未送出

        if (!reply.raw.headersSent) {
          return reply.status(500).send({
            error: "Streaming failed",
          });
        }

        // SSE 已開始

        reply.raw.write("data: [ERROR]\n\n");

        reply.raw.end();
      }
    },
  );
}
