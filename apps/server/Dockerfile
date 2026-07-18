FROM node:24

WORKDIR /app

RUN corepack enable
RUN corepack prepare pnpm@9.0.6 --activate


COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/server/package.json ./apps/server/package.json
COPY apps/server ./apps/server

RUN pnpm install --frozen-lockfile

WORKDIR /app/apps/server

RUN pnpm prisma generate
RUN pnpm build


EXPOSE 3000


CMD ["pnpm","start"]