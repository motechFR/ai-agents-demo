import { json, useLoaderData, useFetcher } from "@remix-run/react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ChatHistory, Message } from "~/components/widgets/ChatHistory";
import "~/components/widgets/ChatHistory/ChatHistory.css";
import { MermaidJS } from "~/components/widgets/MermaidJS";
import { requestChatCompletion } from 'server/lib/requestChatCompletion';
import "./levels.01.css";

export async function action({ request }: { request: Request }) {
    const {message} = await request.json();

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

type Tab = 'mermaid' | 'chat' | 'side-by-side';

export default function Level01() {
    const { content } = useLoaderData<typeof loader>();

    const fetcher = useFetcher<{ message: Message }>();


    const [messages, setMessages] = useState<Message[]>([]);
    const [activeTab, setActiveTab] = useState<Tab>('side-by-side');
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

        // Send as JSON
        fetcher.submit(
            JSON.stringify({ message: content }), 
            { 
                method: "POST",
                encType: "application/json"
            }
        );
    };

    // Add an effect to handle the fetcher response
    useEffect(() => {
        if (fetcher.data?.message) {
            setMessages((prev) => [...prev, {...fetcher.data!.message, timestamp: new Date(fetcher.data!.message.timestamp)}]);
        }
    }, [fetcher.data]);

    const renderContent = () => {
        switch (activeTab) {
            case 'mermaid':
                return (
                    <div className="full-width-container">
                        <h2>Flowchart</h2>
                        <MermaidJS content={content} />
                    </div>
                );
            case 'chat':
                return (
                    <div className="full-width-container">
                        <h2>AI Chat</h2>
                        <ChatHistory 
                            messages={messages}
                            onSendMessage={handleSendMessage}
                            suggestedMessages={suggestedMessages}
                        />
                    </div>
                );
            case 'side-by-side':
                return (
                    <div className="side-by-side-container">
                        <div className="content-section">
                            <h2>Flowchart</h2>
                            <MermaidJS content={content} />
                        </div>
                        <div className="content-section">
                            <h2>AI Chat</h2>
                            <ChatHistory 
                                messages={messages}
                                onSendMessage={handleSendMessage}
                                suggestedMessages={suggestedMessages}
                            />
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="level-container">
            <h1>Level 01</h1>
            <div className="tab-container">
                <button 
                    className={`tab-button ${activeTab === 'mermaid' ? 'active' : ''}`}
                    onClick={() => setActiveTab('mermaid')}
                >
                    Flowchart
                </button>
                <button 
                    className={`tab-button ${activeTab === 'chat' ? 'active' : ''}`}
                    onClick={() => setActiveTab('chat')}
                >
                    Chat
                </button>
                <button 
                    className={`tab-button ${activeTab === 'side-by-side' ? 'active' : ''}`}
                    onClick={() => setActiveTab('side-by-side')}
                >
                    Side by Side
                </button>
            </div>
            {renderContent()}
        </div>
    );
}