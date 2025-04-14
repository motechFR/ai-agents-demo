import { json, useLoaderData } from "@remix-run/react";
import { v4 as uuidv4 } from 'uuid';
import { Message } from "~/components/widgets/ChatHistory";
import { requestChatCompletion } from 'server/lib/requestChatCompletion';
import { LevelLayout } from "~/components/LevelLayout";

export async function action({ request }: { request: Request }) {
    const {message, history} = await request.json();

    const systemPrompt = `
    You are a DeFi expert with access to crypto price data. Your role is to help the user understand the DeFi space, view market data, and make informed decisions about their investments.

    Users remain responsible for their own investments.

    Provide info in a concise manner and be specific.

    Refuse to discuss topics that are not somewhat related to cryptocurrency or blockchain.
    `;

    // Simulating tool usage for crypto prices (in a real implementation, this would call external APIs)
    const userMessage = message as string;
    let enhancedPrompt = userMessage;
    
    if (userMessage.toLowerCase().includes('price') || userMessage.toLowerCase().includes('value') || userMessage.toLowerCase().includes('worth')) {
        enhancedPrompt += "\n\nTool Response: [Crypto Price Tool]\nBTC: $63,245.78 (+2.3% 24h)\nETH: $3,076.45 (+1.2% 24h)\nSOL: $142.89 (+4.5% 24h)\nData as of " + new Date().toISOString();
    }

    if (userMessage.toLowerCase().includes('trend') || userMessage.toLowerCase().includes('history') || userMessage.toLowerCase().includes('chart')) {
        enhancedPrompt += "\n\nTool Response: [Historical Data Tool]\nBTC 7-day trend: Up 5.2%\nETH 7-day trend: Up 3.8%\nSOL 7-day trend: Up 12.4%\nData as of " + new Date().toISOString();
    }

    const chatCompletion = await requestChatCompletion({
        messages: [{role: 'system', content: systemPrompt}, ...history.map((m: Message) => ({
            role: m.sender,
            content: m.content,
        })), {
            role: 'user',
            content: enhancedPrompt,
        }],
        model: 'gpt-4o-mini',
    });

    const responseMessage: Message = {
        id: uuidv4(),
        content: chatCompletion.choices[0].message.content as string,
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

    const initialMessages: Message[] = [{
        id: '1',
        content: 'What is the current price of Bitcoin?',
        sender: 'user',
        timestamp: new Date(Date.now() - 3000),
    }, {
        id: uuidv4(),
        content: "Based on the latest data, Bitcoin is currently trading at $63,245.78, up 2.3% in the last 24 hours. Keep in mind that cryptocurrency prices are highly volatile and can change rapidly. Is there any specific reason you're interested in Bitcoin's price, or would you like information about other cryptocurrencies as well?",
        sender: 'assistant',
        timestamp: new Date(),
    }];

    const suggestedMessages = ['Show me Ethereum price trends', 'How do prices compare to last week?', 'What should I have for dinner?'];

    return (
        <LevelLayout 
            levelNumber={4}
            mermaidJsChart={content}
            initialMessages={initialMessages}
            suggestedMessages={suggestedMessages}
        />
    );
} 