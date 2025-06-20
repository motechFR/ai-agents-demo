import { json, useLoaderData } from "@remix-run/react";
import { v4 as uuidv4 } from 'uuid';
import { Message } from "~/components/widgets/ChatHistory";
import { requestChatCompletion } from 'server/lib/requestChatCompletion';
import { LevelLayout } from "~/components/LevelLayout";

export async function action({ request }: { request: Request }) {
    const {message} = await request.json();

    const chatCompletion = await requestChatCompletion({
        messages: [{
            role: 'user',
            content: message as string,
        }]
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
    const content = await import('server/lib/levels/flowcharts/level01.md');
    return {
        content: (content as any as {markdown: string}).markdown,
    };
}

export default function Level01() {
    const { content } = useLoaderData<typeof loader>();


    const initialSuggestedMessages = ['Which cryptocurrency should I invest in?', 'What did you just say?'];

    return (
        <LevelLayout 
            levelNumber={1}
            mermaidJsChart={content}
            suggestedMessages={initialSuggestedMessages}
        />
    );
}