import prisma from "../lib/prisma.js";

export async function createSession(title: string) {
  return prisma.session.create({
    data: {
      title,
    },
  });
}

export async function getSessions() {
  return prisma.session.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function findSessionById(id: string) {
  return prisma.session.findUnique({
    where: {
      id,
    },
  });
}

export async function updateSession(sessionId: string, title: string) {
  return prisma.session.update({
    where: {
      id: sessionId,
    },

    data: {
      title,
    },
  });
}

export async function getSession(sessionId: string) {
  return prisma.session.findUnique({
    where: {
      id: sessionId,
    },
  });
}

export async function deleteSession(id: string) {
  return prisma.session.delete({
    where: {
      id,
    },
  });
}
