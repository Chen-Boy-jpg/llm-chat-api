import Fastify from "fastify";

import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

import sessionRoutes from "./routes/sessions.js";
import messageRoutes from "./routes/messages.js";

import errorHandler from "./plugins/errorHandler.js";
import lifecycle from "./plugins/lifecycle.js";

import "dotenv/config";


export async function buildApp(){

  const app =
    Fastify({
      logger:true
    });


  await app.register(
    swagger,
    {
      openapi:{
        info:{
          title:"LLM Chat Backend API",
          description:
            "Backend service for multi-session LLM chat",
          version:"1.0.0"
        },

        tags:[
          {
            name:"Sessions",
            description:
              "Conversation session APIs"
          },

          {
            name:"Messages",
            description:
              "Chat message APIs"
          }
        ]
      }
    }
  );


  await app.register(
    swaggerUI,
    {
      routePrefix:"/docs"
    }
  );


  await app.register(
    errorHandler
  );

  await app.register(
    lifecycle
  );

  await app.register(
    sessionRoutes
  );


  await app.register(
    messageRoutes
  );


  return app;

}