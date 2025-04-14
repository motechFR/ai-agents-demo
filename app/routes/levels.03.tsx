import { json, useLoaderData } from "@remix-run/react";
import { v4 as uuidv4 } from 'uuid';
import { Message } from "~/components/widgets/ChatHistory";
import { requestChatCompletion } from 'server/lib/requestChatCompletion';
import { LevelLayout } from "~/components/LevelLayout";

export async function action({ request }: { request: Request }) {
    const {message, history} = await request.json();

    const systemPrompt = `
    You are a DeFi expert. Your role is to help the user understand the DeFi space and make informed decisions about their investments.

    Users remain responsible for their own investments.

    Avoid disclaimers. Provide general knowledge about the top tokens, and clearly distinguish betwen investment strategies.

    Provide info a concise manner and be specific.

    Refuse to discuss topics that are not somewhat related to cryptocurrency or blockchain.
    `;

    const chatCompletion = await requestChatCompletion({
        messages: [{role: 'system', content: systemPrompt}, ...history.map((m: Message) => ({
            role: m.sender,
            content: m.content,
        })), {
            role: 'user',
            content: message as string,
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
    const content = await import('/server/lib/levels/flowcharts/level03.md');
    return {
        content: (content as any as {markdown: string}).markdown,
    };
}

export default function Level02() {
    const { content } = useLoaderData<typeof loader>();

    const initialMessages: Message[] = [];

    const suggestedMessages = ['Which cryptocurrency should I invest in?', 'How do I make an apple pie?'];

    return (
        <LevelLayout 
            levelNumber={3}
            mermaidJsChart={content}
            initialMessages={initialMessages}
            suggestedMessages={suggestedMessages}
        />
    );
}