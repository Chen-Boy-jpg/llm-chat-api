import prisma from "../lib/prisma.js";

export async function createUserMessage(sessionId: string, content: string) {
  const session = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
  });

  if (!session) {
    throw new Error("Session not found");
  }

  return prisma.message.create({
    data: {
      role: "user",

      content,

      sessionId,
    },
  });
}

export async function createAssistantMessage(sessionId: string, content: string) {
  return prisma.message.create({
    data: {
      role: "assistant",

      content,

      sessionId,
    },
  });
}

export async function getMessages(sessionId: string) {
  return prisma.message.findMany({
    where: {
      sessionId,
    },

    orderBy: {
      createdAt: "asc",
    },
  });
}
