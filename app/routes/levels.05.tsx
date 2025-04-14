import { json, useLoaderData } from "@remix-run/react";
import { v4 as uuidv4 } from 'uuid';
import { Message } from "~/components/widgets/ChatHistory";
import { requestChatCompletion } from 'server/lib/requestChatCompletion';
import { LevelLayout } from "~/components/LevelLayout";

export async function action({ request }: { request: Request }) {
    const {message, history} = await request.json();

    const systemPrompt = `
    You are a DeFi expert with wallet integration capabilities. Your role is to help the user understand the DeFi space, view market data, and execute trades via their connected wallet.

    Users remain responsible for their own investments and trades.

    Provide info in a concise manner and be specific.

    Refuse to discuss topics that are not somewhat related to cryptocurrency or blockchain.
    `;

    // Simulating tool usage for wallet integration
    const userMessage = message as string;
    let enhancedPrompt = userMessage;
    let transactionExecuted = false;
    
    if (userMessage.toLowerCase().includes('price') || userMessage.toLowerCase().includes('value')) {
        enhancedPrompt += "\n\nTool Response: [Crypto Price Tool]\nBTC: $63,245.78 (+2.3% 24h)\nETH: $3,076.45 (+1.2% 24h)\nSOL: $142.89 (+4.5% 24h)\nData as of " + new Date().toISOString();
    }

    if (userMessage.toLowerCase().includes('buy') || userMessage.toLowerCase().includes('purchase')) {
        enhancedPrompt += "\n\nTool Response: [Wallet Integration]\nWallet connected: 0x7a2...f3b9\nBalance: 5.2 ETH\nTransaction simulated: Purchase 0.1 BTC at market price\nEstimated cost: 2.1 ETH\nTransaction ready to execute";
        transactionExecuted = true;
    }

    if (userMessage.toLowerCase().includes('sell') || userMessage.toLowerCase().includes('trade')) {
        enhancedPrompt += "\n\nTool Response: [Wallet Integration]\nWallet connected: 0x7a2...f3b9\nBalance: 0.15 BTC, 3.1 ETH\nTransaction simulated: Sell 0.05 BTC at market price\nEstimated return: 1.05 ETH\nTransaction ready to execute";
        transactionExecuted = true;
    }

    if (transactionExecuted && (userMessage.toLowerCase().includes('confirm') || userMessage.toLowerCase().includes('execute'))) {
        enhancedPrompt += "\n\nTool Response: [Transaction Service]\nTransaction submitted to blockchain\nTransaction hash: 0x8f721a5436172f7a3f1c5e578de9c55123706410a0c1dd3ca6924857eccbcd2a\nStatus: Pending\nEstimated confirmation time: 2-3 minutes";
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
    const content = await import('/server/lib/levels/flowcharts/level05.md');
    return {
        content: (content as any as {markdown: string}).markdown,
    };
}

export default function Level05() {
    const { content } = useLoaderData<typeof loader>();

    const initialMessages: Message[] = [{
        id: '1',
        content: 'I want to buy some Bitcoin with my Ethereum.',
        sender: 'user',
        timestamp: new Date(Date.now() - 3000),
    }, {
        id: uuidv4(),
        content: "I can help you with that. I've connected to your wallet (0x7a2...f3b9) and can see you have 5.2 ETH available.\n\nBased on current market prices, you can buy approximately 0.1 BTC for 2.1 ETH (including network fees).\n\nWould you like to proceed with this transaction? If so, please specify how much BTC you want to purchase, or confirm the suggested amount. I'll need your explicit confirmation before executing any trade.",
        sender: 'assistant',
        timestamp: new Date(),
    }];

    const suggestedMessages = ['Yes, buy 0.1 BTC for me', 'What\'s the current gas fee?', 'Can you make me a sandwich?'];

    return (
        <LevelLayout 
            levelNumber={5}
            mermaidJsChart={content}
            initialMessages={initialMessages}
            suggestedMessages={suggestedMessages}
        />
    );
} 