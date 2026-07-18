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
    "Messages API",
    () => {


        let sessionId: string;



        it(
            "create test session",
            async () => {


                const app =
                    await buildApp();


                const response =
                    await app.inject({

                        method: "POST",

                        url: "/sessions",

                        payload: {
                            title: "message test"
                        }

                    });


                sessionId =
                    response.json().id;


                await app.close();


            });



        it(
            "POST message",
            async () => {


                const app =
                    await buildApp();



                const response =
                    await app.inject({

                        method: "POST",

                        url:
                            `/sessions/${sessionId}/messages`,

                        payload: {

                            content:
                                "Hello"

                        }

                    });


                expect(
                    response.statusCode
                )
                    .toBe(201);



                const body =
                    response.json();

console.log(body);

                expect(
                    body.userMessage?.role
                )
                    .toBe(
                        "user"
                    );



                expect(
                    body.assistantMessage.content
                )
                    .toBe(
                        "mock assistant reply"
                    );



                await app.close();


            });



        it(
            "GET messages",
            async () => {


                const app =
                    await buildApp();



                const response =
                    await app.inject({

                        method: "GET",

                        url:
                            `/sessions/${sessionId}/messages`

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



                await app.close();



            });



        it(
            "cleanup",
            async () => {


                await prisma.session.delete({

                    where: {
                        id: sessionId
                    }

                });


            });


    });