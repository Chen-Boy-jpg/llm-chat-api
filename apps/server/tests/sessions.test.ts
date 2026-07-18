import {
  describe,
  it,
  expect
} from "vitest";

import { vi } from "vitest";


vi.mock(
  "../src/services/llm.service.js",
  () => ({

    generateReply:
      async () =>
        "mock assistant reply",


    streamReply:
      async function* () {

      }

  })
);


import {
  buildApp
} from "../src/app.js";


import prisma from "../src/lib/prisma.js";


describe(
  "Sessions API",
  ()=>{


    const app =
      buildApp();


    let sessionId:string;


    it(
      "POST /sessions create session",
      async()=>{


        const server =
          await app;


        const response =
          await server.inject({

            method:"POST",

            url:"/sessions",

            payload:{

              title:
                "Test Chat"

            }

          });

          console.log(response.body)


        expect(
          response.statusCode
        )
        .toBe(201);


        const body =
          response.json();


        expect(
          body.id
        )
        .toBeDefined();


        sessionId =
          body.id;

      }
    );



    it(
      "GET /sessions",
      async()=>{


        const response =
          await (
            await app
          )
          .inject({

            method:"GET",

            url:"/sessions"

          });


        expect(
          response.statusCode
        )
        .toBe(200);


        expect(
          response.json()
        )
        .toBeInstanceOf(
          Array
        );


      }
    );



    it(
      "GET /sessions/:id",
      async()=>{


        const response =
          await (
            await app
          )
          .inject({

            method:"GET",

            url:
              `/sessions/${sessionId}`

          });


        expect(
          response.statusCode
        )
        .toBe(200);


        expect(
          response.json().id
        )
        .toBe(
          sessionId
        );

      }
    );



    it(
      "PATCH /sessions/:id",
      async()=>{


        const response =
          await (
            await app
          )
          .inject({

            method:"PATCH",

            url:
              `/sessions/${sessionId}`,

            payload:{

              title:
                "Updated"

            }

          });


        expect(
          response.statusCode
        )
        .toBe(200);


        expect(
          response.json().title
        )
        .toBe(
          "Updated"
        );

      }
    );



    it(
      "cleanup",
      async()=>{


        await prisma.session.delete({

          where:{
            id:
              sessionId
          }

        });


        await (
          await app
        )
        .close();


      }
    );


  }
);