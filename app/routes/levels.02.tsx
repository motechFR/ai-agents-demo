import { json, useLoaderData, useFetcher } from "@remix-run/react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ChatHistory, Message } from "~/components/widgets/ChatHistory";
import "~/components/widgets/ChatHistory/ChatHistory.css";
import { MermaidJS } from "~/components/widgets/MermaidJS";
import { requestChatCompletion } from 'server/lib/requestChatCompletion';
import "./levels.02.css";

export async function action({ request }: { request: Request }) {
    const {message, history} = await request.json();

    const chatCompletion = await requestChatCompletion({
        messages: [...history.map((m: Message) => ({
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
    const content = await import('/app/lib/levels/flowcharts/level02.md');
    return {
        content: (content as any as {markdown: string}).markdown,
    };
}

type Tab = 'mermaid' | 'chat' | 'side-by-side';

export default function Level02() {
    const { content } = useLoaderData<typeof loader>();

    const fetcher = useFetcher<{ message: Message }>();


    const [messages, setMessages] = useState<Message[]>([{
        id: '1',
        content: 'Which cryptocurrency should I invest in?',
        sender: 'user',
        timestamp: new Date(Date.now() - 3000),
    }, {
        "id": "b594776b-6d2f-46af-abef-7fa34eefded8",
        "content": "I'm not a financial advisor, so I can't provide specific investment recommendations. However, I can suggest some general factors to consider when researching cryptocurrencies:\n\n1. **Market Cap**: Look for cryptocurrencies with a solid market capitalization. Larger market cap coins tend to be less volatile.\n\n2. **Use Case**: Understand the purpose of the cryptocurrency. What problem does it solve? Does it have real-world applications?\n\n3. **Technology**: Evaluate the underlying technology. Is it innovative? Is it scalable? What are its security features?\n\n4. **Development Team**: Research the team behind the cryptocurrency. A strong, experienced team can often lead to greater adoption and success.\n\n5. **Community and Adoption**: A strong community and growing adoption can be indicators of a cryptocurrency's potential for long-term success.\n\n6. **Regulatory Environment**: Consider the legal status of the cryptocurrency in your country, as regulatory changes can impact its value.\n\n7. **Diversification**: Avoid putting all your funds into one cryptocurrency. Diversifying your investments can help manage risk.\n\n8. **Stay Informed**: Keep up with the latest news and trends in the cryptocurrency space, as the market can shift rapidly.\n\nBefore investing, it's essential to do thorough research and only invest what you can afford to lose.",
        sender: 'assistant',
        timestamp: new Date(),
    }]);
    const [activeTab, setActiveTab] = useState<Tab>('side-by-side');
    const [suggestedMessages, setSuggestedMessages] = useState<string[]>(['What did I just ask about?', 'How do I make an apple pie?']);

    const handleSendMessage = async (content: string) => {
        setSuggestedMessages([]);

        // Add the human message
        const humanMessage: Message = {
            id: Date.now().toString(),
            content,
            sender: 'user',
            timestamp: new Date(),
        };

        // Send as JSON
        fetcher.submit(
            JSON.stringify({ message: content, history: messages }), 
            { 
                method: "POST",
                encType: "application/json"
            }
        );

        setMessages((prev) => [...prev, humanMessage]);
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
            <div className="level-header">
                <h1 className="level-title">Level 02</h1>
                <div className="tab-container">
                <button 
                        className={`tab-button ${activeTab === 'side-by-side' ? 'active' : ''}`}
                        onClick={() => setActiveTab('side-by-side')}
                    >
                        Side by Side
                    </button>
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
                </div>
            </div>
            {renderContent()}
        </div>
    );
}