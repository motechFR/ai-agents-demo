import { json, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ChatHistory, Message } from "~/components/widgets/ChatHistory";
import "~/components/widgets/ChatHistory/ChatHistory.css";
import { MermaidJS } from "~/components/widgets/MermaidJS";

import { requestChatCompletion } from 'server/lib/requestChatCompletion';

export async function action({ request }: { request: Request }) {
    const formData = await request.formData();
    const message = formData.get('message');

    const chatCompletion = await requestChatCompletion({
        messages: [{
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
    const content = await import('/app/lib/levels/flowcharts/level01.md');
    return {
        content: (content as any as {markdown: string}).markdown,
    };
}

export default function Level01() {
    const { content } = useLoaderData<typeof loader>();
    const [messages, setMessages] = useState<Message[]>([
    ]);

    const [suggestedMessages, setSuggestedMessages] = useState<string[]>(['Which cryptocurrency should I invest in?', 'How do I make an apple pie?']);

    const handleSendMessage = async (content: string) => {
        setSuggestedMessages([...suggestedMessages, content]);

        // Add the human message
        const humanMessage: Message = {
            id: Date.now().toString(),
            content,
            sender: 'user',
            timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, humanMessage]);
    
        // Send JSON to the server action
        const response = await fetch("/routes/levels.01", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: content }),
        });

        const responseMessage = await response.json();
        setMessages((prev) => [...prev, responseMessage.message]);
    };

    return (
        <div>
            <h1>Level 01</h1>
            <div style={{ display: 'flex', gap: '2rem' }}>
                <div style={{ flex: 1 }}>
                    <MermaidJS content={content} />
                </div>
                <div style={{ flex: 1 }}>
                    <h2>AI Chat</h2>
                    <ChatHistory 
                        messages={messages}
                        onSendMessage={handleSendMessage}
                        suggestedMessages={suggestedMessages}
                    />
                </div>
            </div>
        </div>
    );
}