import { NextRequest } from "next/server";
import { notFound } from "next/navigation";

const authHeader = `Bearer ${process.env.GROQ_API_KEY}`;

export async function POST(request: NextRequest) {
  const body = (await request.json()) as GroqRequest;

  if (request.headers.get("Authorization") !== authHeader) {
    console.log("Got: " + JSON.stringify(request.headers.get("Authorization")));
    notFound();
  }

  const url = "https://api.groq.com/openai/v1/chat/completions";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
    },
    body: JSON.stringify(body),
  });

  const data = (await response.json()) as GroqResponse;

  console.log(`Input: ${body?.messages?.[0]?.content}`);
  console.log(`Output: ${data?.choices?.[0]?.message?.content}`);

  return Response.json(data);
}

interface GroqRequest {
  model: string;
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  stop?: string;
  stream: boolean;
  messages: {
    role: "system" | "user";
    content: string;
  }[];
}
interface GroqResponse {
  id: string;
  object: "chat.completion";
  created: number;
  model: string;
  choices: {
    index: number;
    message: { role: string; content: string };
    logprobs: null;
    finish_reason: string;
  }[];
  usage: {
    queue_time: number;
    prompt_tokens: number;
    prompt_time: number;
    completion_tokens: number;
    completion_time: number;
    total_tokens: number;
    total_time: number;
  };
  system_fingerprint: string;
  x_groq: { id: string };
}
