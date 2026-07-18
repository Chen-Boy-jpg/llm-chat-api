import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,

  baseURL: "https://integrate.api.nvidia.com/v1",
});

type ChatMessage = {
  role: "user" | "assistant" | "system";

  content: string;
};

export async function generateReply(messages: ChatMessage[]) {
  const response = await client.chat.completions.create({
    model: process.env.NVIDIA_MODEL!,

    messages,

    temperature: 0.7,
  });

  return response.choices[0].message.content ?? "";
}

export async function streamReply(messages: ChatMessage[]) {
  return client.chat.completions.create({
    model: process.env.NVIDIA_MODEL!,

    messages,

    temperature: 0.7,

    stream: true,
  });
}
