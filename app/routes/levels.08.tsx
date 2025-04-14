import { json, useLoaderData } from "@remix-run/react";
import { v4 as uuidv4 } from 'uuid';
import { Message } from "~/components/widgets/ChatHistory";
import { requestChatCompletion } from 'server/lib/requestChatCompletion';
import { LevelLayout } from "~/components/LevelLayout";

export async function action({ request }: { request: Request }) {
    const {message, history} = await request.json();

    const systemPrompt = `
    You are the user interface agent in a fully agentic system with portfolio and risk management capabilities. 
    Your role is to help the user understand their portfolio, make informed decisions, and interact with the agentic system.

    The system includes specialized autonomous agents for portfolio management, risk assessment, market analysis, and trade execution.
    
    All agents operate under strict risk constraints and portfolio management rules.

    Users remain responsible for their own investments and trades.

    Provide info in a concise manner and be specific.

    Refuse to discuss topics that are not somewhat related to cryptocurrency or blockchain.
    `;

    // Simulating fully agentic system
    const userMessage = message as string;
    let enhancedPrompt = userMessage;
    
    // Portfolio management agent
    if (userMessage.toLowerCase().includes('portfolio') || userMessage.toLowerCase().includes('holdings') || 
        userMessage.toLowerCase().includes('balance') || userMessage.toLowerCase().includes('assets')) {
        enhancedPrompt += "\n\nTool Response: [Portfolio Management Agent]\nCurrent Portfolio:\n- BTC: 0.5 BTC ($31,622.89) - 42.3% of portfolio\n- ETH: 3.2 ETH ($9,844.64) - 13.2% of portfolio\n- SOL: 65 SOL ($9,287.85) - 12.4% of portfolio\n- USDC: 24,000 USDC ($24,000) - 32.1% of portfolio\nTotal portfolio value: $74,755.38\nPortfolio performance: +12.8% (30d)\nRisk exposure: MODERATE\nDiversification score: 7.5/10\nRecommendation: Consider rebalancing to reduce BTC exposure";
    }
    
    // Risk management agent
    if (userMessage.toLowerCase().includes('risk') || userMessage.toLowerCase().includes('exposure') || userMessage.toLowerCase().includes('safety')) {
        enhancedPrompt += "\n\nTool Response: [Risk Management Agent]\nRisk Analysis:\n- Market volatility: MEDIUM\n- Concentration risk: HIGH (BTC > 40%)\n- Correlation risk: MEDIUM\n- Liquidity risk: LOW\nRisk constraints:\n- Max allocation per asset: 35% (VIOLATED: BTC 42.3%)\n- Min stablecoin reserve: 15% (MET: USDC 32.1%)\n- Max leverage: 0% (MET: No leverage)\nRecommendation: Reduce BTC position by 7-10% to meet risk constraints";
    }
    
    // Market analysis agent
    if (userMessage.toLowerCase().includes('market') || userMessage.toLowerCase().includes('analysis') || userMessage.toLowerCase().includes('trend')) {
        enhancedPrompt += "\n\nTool Response: [Market Analysis Agent]\nMarket Analysis:\n- BTC: BULLISH (8/10) - Breaking key resistance, strong on-chain metrics\n- ETH: NEUTRAL (5/10) - Consolidating, upcoming protocol changes\n- SOL: BULLISH (7/10) - Ecosystem growth accelerating, increasing adoption\n- Overall market: Cautiously bullish\nKey metrics:\n- Fear & Greed Index: 72 (Greed)\n- BTC Dominance: 51.2% (Increasing)\n- DeFi TVL: $42.7B (Stable)\nRecommendation: Consider taking partial profits on BTC position";
    }
    
    // Trade execution agent
    if (userMessage.toLowerCase().includes('trade') || userMessage.toLowerCase().includes('buy') || 
        userMessage.toLowerCase().includes('sell') || userMessage.toLowerCase().includes('swap') || 
        userMessage.toLowerCase().includes('rebalance')) {
        enhancedPrompt += "\n\nTool Response: [Trade Execution Agent]\nAnalyzing request...\nWallet connected: 0x7a2...f3b9\nRecommended execution strategy: TWAP (Time-Weighted Average Price)\nOptimal execution path: 1. BTC → USDC (Binance) 2. USDC → SOL (Raydium)\nEstimated slippage: 0.3%\nEstimated fees: $14.76\nBest execution time: Within next 48 hours\nRisk check: PASSED (Trade reduces portfolio risk)\nRecommendation: Execute 0.05 BTC to USDC now, remaining 0.05 BTC in 24 hours";
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
    const content = await import('/server/lib/levels/flowcharts/level08.md');
    return {
        content: (content as any as {markdown: string}).markdown,
    };
}

export default function Level08() {
    const { content } = useLoaderData<typeof loader>();

    const initialMessages: Message[] = [{
        id: '1',
        content: 'I think my portfolio is too heavily weighted toward Bitcoin. Can you help me rebalance?',
        sender: 'user',
        timestamp: new Date(Date.now() - 3000),
    }, {
        id: uuidv4(),
        content: "You're right to be concerned about your portfolio concentration. After analyzing your holdings, I can see that Bitcoin currently makes up 42.3% of your portfolio, which exceeds our recommended maximum allocation of 35% per asset.\n\n**Current Portfolio:**\n- BTC: 0.5 BTC ($31,622.89) - 42.3%\n- ETH: 3.2 ETH ($9,844.64) - 13.2%\n- SOL: 65 SOL ($9,287.85) - 12.4%\n- USDC: 24,000 USDC ($24,000) - 32.1%\n\n**Risk Analysis:**\n- Your BTC position presents a concentration risk\n- Market analysis indicates BTC is bullish (8/10), but taking partial profits would be prudent\n\n**Rebalancing Recommendation:**\nSell 0.1 BTC (~$6,324) to reduce your BTC allocation to approximately 34%, which would align with our risk constraints.\n\n**Execution Strategy:**\n- Use a TWAP approach (Time-Weighted Average Price) to minimize slippage\n- Execute 0.05 BTC to USDC now, and the remaining 0.05 BTC in 24 hours\n- Estimated fees: $14.76\n- Slippage: ~0.3%\n\nWould you like to proceed with this rebalancing strategy?",
        sender: 'assistant',
        timestamp: new Date(),
    }];

    const suggestedMessages = ['Yes, execute the rebalancing strategy', 'What should I do with the USDC?', 'Show me market analysis for SOL'];

    return (
        <LevelLayout 
            levelNumber={8}
            mermaidJsChart={content}
            initialMessages={initialMessages}
            suggestedMessages={suggestedMessages}
        />
    );
} 