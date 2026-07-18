import "dotenv/config";

import { vi } from "vitest";


vi.mock(
  "../src/services/llm.service.js",
  ()=>({

    generateReply:
      async()=> "mock assistant reply",


    streamReply:
      async function*(){}

  })
);