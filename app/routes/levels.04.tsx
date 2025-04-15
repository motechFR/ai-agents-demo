import { json, useLoaderData } from "@remix-run/react";
import { v4 as uuidv4 } from 'uuid';
import { Message } from "~/components/widgets/ChatHistory";
import { requestChatCompletion } from 'server/lib/requestChatCompletion';
import { LevelLayout } from "~/components/LevelLayout";
import { loadTools, runTool, ToolName, tools } from "server/lib/tools/index";

export async function action({ request }: { request: Request }) {
    const {message, history} = await request.json();

    const allowedTools: ToolName[] = ['getEthPrice'];

    const systemPrompt = `
    You are a DeFi expert with access to crypto price data. Your role is to help the user understand the DeFi space, view market data, and make informed decisions about their investments.

    Users remain responsible for their own investments.

    Provide info in a concise manner and be specific.

    If you need to get price data, use USD as the default currency unless the user specifies otherwise.

    Refuse to discuss topics that are not somewhat related to cryptocurrency or blockchain.
    `;

    // Simulating tool usage for crypto prices (in a real implementation, this would call external APIs)
    const userMessage = message as string;
    let enhancedPrompt = userMessage;
    
    const chatCompletion = await requestChatCompletion({
        messages: [{role: 'system', content: systemPrompt}, ...history.map((m: Message) => ({
            role: m.sender,
            content: m.content,
        })), {
            role: 'user',
            content: enhancedPrompt,
        }],
        model: 'gpt-4o-mini',
        tools: loadTools(allowedTools),
        parallel_tool_calls: true,
    });

    const requiredToolCalls = chatCompletion.choices[0].message.tool_calls;

    if (!requiredToolCalls) {
        const responseMessage: Message = {
            id: uuidv4(),
            content: chatCompletion.choices[0].message.content as string,
            sender: 'assistant',
            timestamp: new Date(),
        }
        return json({ message: responseMessage });
    }

    let results: Record<string, any> = {};

    await Promise.all(requiredToolCalls.map(async (toolCall) => {
        const toolName = toolCall.function.name as ToolName;
        const toolArgs = JSON.parse(toolCall.function.arguments);
        const result = await runTool({ toolName, args: toolArgs, allowedTools });
        results[toolName] = result;
    }));


    const toolOutputsMessage = `Here is the output of the tool calls. Use this to help you answer the user's question:\n\n    ${JSON.stringify(results)}`;

    const secondChatCompletion = await requestChatCompletion({
        messages: [
            { role: 'system', content: systemPrompt },
            ...history.map((m: Message) => ({
                role: m.sender,
                content: m.content,
            })),
            { role: 'user', content: userMessage },
            { role: 'assistant', content: toolOutputsMessage },
        ],
        model: 'gpt-4o-mini',
        // This time we don't need any tools
        tools: undefined
    });

    const responseMessage: Message = {
        id: uuidv4(),
        content: secondChatCompletion.choices[0].message.content as string,
        sender: 'assistant',
        timestamp: new Date(),
    }

    return json({ message: responseMessage });
}

export async function loader() {
    // @ts-ignore
    const content = await import('/server/lib/levels/flowcharts/level04.md');
    return {
        content: (content as any as {markdown: string}).markdown,
    };
}

export default function Level04() {
    const { content } = useLoaderData<typeof loader>();

    const initialMessages: Message[] = [];

    const suggestedMessages = ['What is the price of Ethereum?'];

    return (
        <LevelLayout 
            levelNumber={4}
            mermaidJsChart={content}
            initialMessages={initialMessages}
            suggestedMessages={suggestedMessages}
        />
    );
} 