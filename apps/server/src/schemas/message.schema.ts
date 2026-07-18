export const createMessageSchema = {
  schema:{
    tags:[
      "Messages"
    ],

    params:{
      type:"object",
      required:[
        "sessionId"
      ],
      properties:{
        sessionId:{
          type:"string"
        }
      }
    },

    body:{
      type:"object",
      required:[
        "content"
      ],
      properties:{
        content:{
          type:"string"
        }
      }
    },

    response:{
      201:{
        type:"object",

        properties:{
          userMessage:{
            type:"object",
            properties:{
              id:{
                type:"string"
              },

              role:{
                type:"string"
              },

              content:{
                type:"string"
              },

              sessionId:{
                type:"string"
              },

              createdAt:{
                type:"string"
              }
            }
          },

          assistantMessage:{
            type:"object",
            properties:{
              id:{
                type:"string"
              },

              role:{
                type:"string"
              },

              content:{
                type:"string"
              },

              sessionId:{
                type:"string"
              },

              createdAt:{
                type:"string"
              }
            }
          }
        }
      }
    }
  }
};

export const getMessagesSchema = {
  schema: {
    tags: ["Messages"],
    params: {
      type: "object",
      required: ["sessionId"],
      properties: {
        sessionId: { type: "string" },
      },
    },
    response: {
      200: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            role: { type: "string" },
            content: { type: "string" },
            createdAt: { type: "string" },
          },
        },
      },
    },
  },
};

export const streamMessageSchema = {
  schema: {
    tags: ["Messages"],
    params: {
      type: "object",
      required: ["sessionId"],
      properties: {
        sessionId: { type: "string" },
      },
    },
    body: {
      type: "object",
      required: ["content"],
      properties: {
        content: { type: "string" },
      },
    },
  },
};
