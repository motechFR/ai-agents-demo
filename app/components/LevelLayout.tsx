import { ReactNode, useState, useEffect } from "react";
import { useFetcher } from "@remix-run/react";
import { ChatHistory, Message } from "~/components/widgets/ChatHistory";
import "~/components/widgets/ChatHistory/ChatHistory.css";
import { MermaidJS } from "~/components/widgets/MermaidJS";
import "./LevelLayout.css";
import { getLevel} from 'server/lib/levels/definitions'
type Tab = 'mermaid' | 'chat' | 'side-by-side';

interface LevelLayoutProps {
    levelNumber: number;
    mermaidJsChart: string;
    initialMessages?: Message[];
    onSendMessage?: (data: {content: string, history: Message[]}) => Promise<Message | null>;
    suggestedMessages?: string[];
    children?: ReactNode;
    enabledModes?: Tab[];
}

export function LevelLayout({ 
    levelNumber, 
    mermaidJsChart, 
    initialMessages = [],
    onSendMessage,
    suggestedMessages = [],
    children,
    enabledModes = ['mermaid', 'chat', 'side-by-side']
}: LevelLayoutProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<Tab | null>(null);
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const fetcher = useFetcher<{ message: Message }>();


    const levelInfo = getLevel(levelNumber);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedTab = localStorage.getItem('levelLayoutActiveTab') as Tab | null;
            
            // Check if saved tab is enabled, otherwise default to first enabled mode
            if (savedTab && enabledModes.includes(savedTab)) {
                setActiveTab(savedTab);
            } else {
                // Default to first enabled mode
                setActiveTab(enabledModes[0]);
            }
            
            setIsLoading(false);
        }
    }, [enabledModes]);

    useEffect(() => {
        if (!isLoading && activeTab) {
            localStorage.setItem('levelLayoutActiveTab', activeTab);
        }
    }, [activeTab, isLoading]);

    // If activeTab is not in enabledModes, switch to first enabled mode
    useEffect(() => {
        if (activeTab && !enabledModes.includes(activeTab)) {
            setActiveTab(enabledModes[0]);
        }
    }, [enabledModes, activeTab]);

    const handleSendMessage = async (content: string) => {
        // Add the human message
        const humanMessage: Message = {
            id: Date.now().toString(),
            content,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, humanMessage]);

        if (onSendMessage) {
            // If custom handler is provided, use it
            const responseMessage = await onSendMessage({content, history: messages});
            if (responseMessage) {
                setMessages((prev) => [...prev, responseMessage]);
            }
        } else {
            // Default behavior if no custom handler provided
            fetcher.submit(
                JSON.stringify({ message: content, history: messages }), 
                { 
                    method: "POST",
                    encType: "application/json"
                }
            );
        }
    };

    // Add an effect to handle the fetcher response
    useEffect(() => {
        if (fetcher.data?.message) {
            setMessages((prev) => [...prev, {...fetcher.data!.message, timestamp: new Date(fetcher.data!.message.timestamp)}]);
        }
    }, [fetcher.data]);

    const renderContent = () => {
        if (children) {
            return children;
        }

        switch (activeTab) {
            case 'mermaid':
                return (
                    <div className="full-width-container level-content">
                        <MermaidJS content={mermaidJsChart} />
                    </div>
                );
            case 'chat':
                return (
                    <div className="full-width-container level-content">
                        <ChatHistory 
                            messages={messages}
                            onSendMessage={handleSendMessage}
                            suggestedMessages={suggestedMessages}
                        />
                    </div>
                );
            case 'side-by-side':
                return (
                    <div className="side-by-side-container level-content">
                        <div className="content-section">
                            <ChatHistory 
                                messages={messages}
                                onSendMessage={handleSendMessage}
                                suggestedMessages={suggestedMessages}
                            />
                        </div>
                        <div className="content-section">
                            <MermaidJS content={mermaidJsChart} />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="level-container">
            <div className="level-header">
                <div className="level-header-left">
                    <div>
                        <h1 className="level-title">Level {levelNumber}</h1>
                        <h3 className="level-subtitle">{levelInfo?.title}</h3>
                    </div>
                </div>
                <div>
                    <p className="level-description">{levelInfo?.description}</p>
                </div>
                <div className="tab-container">
                    <button 
                        className={`tab-button ${activeTab === 'side-by-side' ? 'active' : ''}`}
                        onClick={() => setActiveTab('side-by-side')}
                        disabled={isLoading || !enabledModes.includes('side-by-side')}
                    >
                        Chat & Diagram
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'mermaid' ? 'active' : ''}`}
                        onClick={() => setActiveTab('mermaid')}
                        disabled={isLoading || !enabledModes.includes('mermaid')}
                    >
                        Diagram
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'chat' ? 'active' : ''}`}
                        onClick={() => setActiveTab('chat')}
                        disabled={isLoading || !enabledModes.includes('chat')}
                    >
                        Chat
                    </button>
                </div>
            </div>
            {!isLoading && renderContent()}
        </div>
    );
} 