import { OpenAI } from "openai";

function getOpenAIClient() {
  if (process.env.OPENAI_API_KEY) {
    return new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  } else if (process.env.GEMINI_API_KEY) {
    return new OpenAI({
      apiKey: process.env.GEMINI_API_KEY,
      baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/'
    })
  }

  throw new Error('No API key found. Provide GEMINI_API_KEY or OPENAI_API_KEY in the .env file.');
}

const llmClient = getOpenAIClient();

const LLMModels = {
  'gpt-4o-mini': 'gpt-4o-mini',
  'gemini-2.0-flash': 'gemini-2.0-flash',
} as const;

function getLLMModel(): keyof typeof LLMModels {
  if (process.env.OPENAI_API_KEY) {
    return 'gpt-4o-mini';
  } else if (process.env.GEMINI_API_KEY) {
    return 'gemini-2.0-flash';
  }
  throw new Error('No API key found. Provide GEMINI_API_KEY or OPENAI_API_KEY in the .env file.');
}


export async function requestChatCompletion(params: Omit<OpenAI.Chat.ChatCompletionCreateParamsNonStreaming, 'model'>) {


  for (const tool of params.tools ?? []) {
    // This key causes Gemini to fail
    delete tool.function.parameters!.$schema;
  }


  const completion = await llmClient.chat.completions.create({
    ...params,
    model: getLLMModel(),
  });
  return completion;
}

export async function requestStreamingChatCompletion(params: Omit<OpenAI.Chat.ChatCompletionCreateParamsNonStreaming, 'model'>) {    
    const completion = await llmClient.chat.completions.create({
      ...params,
      model: getLLMModel(),
      stream: true,
    });
    return completion;
  }

