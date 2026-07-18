export const createSessionSchema = {
  schema: {
    tags: ["Sessions"],
    body: {
      type: "object",
      required: ["title"],
      properties: {
        title: { type: "string" },
      },
    },
    response: {
      201: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          createdAt: { type: "string" },
        },
      },
    },
  },
};

export const getSessionsSchema = {
  schema: {
    tags: ["Sessions"],
    response: {
      200: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            title: { type: "string" },
            createdAt: { type: "string" },
          },
        },
      },
    },
  },
};

export const updateSessionSchema = {
  schema: {
    tags: ["Sessions"],
    params: {
      type: "object",
      required: ["sessionId"],
      properties: {
        sessionId: { type: "string" },
      },
    },
    body: {
      type: "object",
      required: ["title"],
      properties: {
        title: { type: "string" },
      },
    },
    response:{
  200:{
    type:"object",

    properties:{
      id:{
        type:"string"
      },

      title:{
        type:"string"
      },

      createdAt:{
        type:"string"
      },

      updatedAt:{
        type:"string"
      }
    }
  }
}
  },
};

export const getSessionSchema = {
  schema: {
    tags: ["Sessions"],
    params: {
      type: "object",
      required: ["sessionId"],
      properties: {
        sessionId: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: ["string", "null"] },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      404: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
};

export const deleteSessionSchema = {
  schema: {
    tags: ["Sessions"],
    params: {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "string" },
      },
    },
    response: {
      204: { type: "null" },
      404: {
        type: "object",
        properties: {
          error: { type: "string" },
        },
      },
    },
  },
};
