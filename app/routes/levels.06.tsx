import { json, useLoaderData } from "@remix-run/react";
import { v4 as uuidv4 } from 'uuid';
import { Message } from "~/components/widgets/ChatHistory";
import { requestChatCompletion } from 'server/lib/requestChatCompletion';
import { LevelLayout } from "~/components/LevelLayout";

export async function action({ request }: { request: Request }) {
    const {message, history} = await request.json();

    const systemPrompt = `
    You are a DeFi expert with persistent data and market coverage. Your role is to help the user understand the DeFi space, access comprehensive market data, and make informed decisions.

    You have a backend agent that continuously indexes tokens and maintains a real-time view of the market.

    Users remain responsible for their own investments and trades.

    Provide info in a concise manner and be specific.

    Refuse to discuss topics that are not somewhat related to cryptocurrency or blockchain.
    `;

    // Simulating backend agent with market data
    const userMessage = message as string;
    let enhancedPrompt = userMessage;
    
    if (userMessage.toLowerCase().includes('market') || userMessage.toLowerCase().includes('overview')) {
        enhancedPrompt += "\n\nTool Response: [Market Coverage Agent]\nTop gainers (24h):\n1. PEPE: +18.7%\n2. SHIB: +12.3%\n3. ARB: +9.5%\n\nTop losers (24h):\n1. DOGE: -5.2%\n2. LINK: -3.8%\n3. ADA: -2.1%\n\nMarket sentiment: Bullish (65/100)\nTotal market cap: $2.47T (+1.2% 24h)\nData as of " + new Date().toISOString();
    }

    if (userMessage.toLowerCase().includes('token') || userMessage.toLowerCase().includes('coin')) {
        // Use regex to extract token symbol if present
        const tokenMatch = userMessage.match(/\b(BTC|ETH|SOL|ADA|DOT|AVAX|PEPE|SHIB|ARB|DOGE|LINK)\b/i);
        const token = tokenMatch ? tokenMatch[0].toUpperCase() : "BTC";
        
        enhancedPrompt += `\n\nTool Response: [Token Indexer Agent]\nToken: ${token}\nPrice: ${Math.random() * 100 > 50 ? '+' : '-'}${(Math.random() * 10).toFixed(2)}%\nMarket Cap: $${(Math.random() * 100).toFixed(2)}B\nVolume (24h): $${(Math.random() * 5).toFixed(2)}B\nCirculating Supply: ${(Math.random() * 100).toFixed(2)}M\nSocial Sentiment: ${Math.random() * 100 > 50 ? 'Positive' : 'Neutral'}\nDeveloper Activity: ${Math.random() * 100 > 70 ? 'High' : 'Medium'}\nData as of ${new Date().toISOString()}`;
    }

    if (userMessage.toLowerCase().includes('news') || userMessage.toLowerCase().includes('latest')) {
        enhancedPrompt += "\n\nTool Response: [News Aggregator Agent]\nLatest headlines:\n1. Bitcoin ETFs see $500M inflows as price stabilizes\n2. Ethereum set for major protocol upgrade next month\n3. Solana NFT volumes surpass Ethereum for third straight week\n4. Regulatory concerns growing over stablecoin market\n5. Major exchange expands institutional offerings\nData as of " + new Date().toISOString();
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
    const content = await import('/server/lib/levels/flowcharts/level06.md');
    return {
        content: (content as any as {markdown: string}).markdown,
    };

}

export default function Level06() {
    const { content } = useLoaderData<typeof loader>();

    const initialMessages: Message[] = [{
        id: '1',
        content: 'Give me a market overview and the latest crypto news.',
        sender: 'user',
        timestamp: new Date(Date.now() - 3000),
    }, {
        id: uuidv4(),
        content: "Here's your market overview:\n\n**Top Gainers (24h)**:\n1. PEPE: +18.7%\n2. SHIB: +12.3%\n3. ARB: +9.5%\n\n**Top Losers (24h)**:\n1. DOGE: -5.2%\n2. LINK: -3.8%\n3. ADA: -2.1%\n\nThe overall market sentiment is currently bullish, with a sentiment score of 65/100. The total crypto market capitalization stands at $2.47 trillion, up 1.2% in the last 24 hours.\n\n**Latest Headlines**:\n1. Bitcoin ETFs have seen $500M in inflows as the price stabilizes\n2. Ethereum is preparing for a major protocol upgrade next month\n3. Solana NFT volumes have surpassed Ethereum for the third straight week\n4. There are growing regulatory concerns over the stablecoin market\n5. A major exchange is expanding its institutional offerings\n\nWould you like more detailed information on any specific token or news item?",
        sender: 'assistant',
        timestamp: new Date(),
    }];

    const suggestedMessages = ['Tell me more about PEPE', 'What\'s the social sentiment for ETH?', 'Any news about regulation?'];

    return (
        <LevelLayout 
            levelNumber={6}
            mermaidJsChart={content}
            initialMessages={initialMessages}
            suggestedMessages={suggestedMessages}
        />
    );
} 