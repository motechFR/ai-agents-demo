import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export async function requestChatCompletion(params: OpenAI.Chat.ChatCompletionCreateParamsNonStreaming) {    
  const completion = await openai.chat.completions.create({
    ...params,
    model: "gpt-4o-mini",
  });
  return completion;
}

export async function requestStreamingChatCompletion(params: OpenAI.Chat.ChatCompletionCreateParamsNonStreaming) {    
    const completion = await openai.chat.completions.create({
      ...params,
      model: "gpt-4o-mini",
      stream: true,
    });
    return completion;
  }

