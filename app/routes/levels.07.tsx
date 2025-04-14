import { json, useLoaderData } from "@remix-run/react";
import { v4 as uuidv4 } from 'uuid';
import { Message } from "~/components/widgets/ChatHistory";
import { requestChatCompletion } from 'server/lib/requestChatCompletion';
import { LevelLayout } from "~/components/LevelLayout";

export async function action({ request }: { request: Request }) {
    const {message, history} = await request.json();

    const systemPrompt = `
    You are the primary conversational agent in a multi-agent system with security checks. Your role is to help the user understand the DeFi space, access market data, and execute trades safely.

    Before any trade is executed, a security agent and a risk assessment agent must approve the transaction.

    Users remain responsible for their own investments and trades.

    Provide info in a concise manner and be specific.

    Refuse to discuss topics that are not somewhat related to cryptocurrency or blockchain.
    `;

    // Simulating multi-agent system
    const userMessage = message as string;
    let enhancedPrompt = userMessage;
    let tradingIntent = false;
    
    // Main agent detects trading intent
    if (userMessage.toLowerCase().includes('buy') || userMessage.toLowerCase().includes('sell') || 
        userMessage.toLowerCase().includes('trade') || userMessage.toLowerCase().includes('swap')) {
        tradingIntent = true;
    }
    
    if (tradingIntent) {
        // Security agent review
        enhancedPrompt += "\n\nTool Response: [Security Agent]\nReviewing transaction request...\nWallet address: 0x7a2...f3b9\nVerifying contract address: 0x38f...c2d5 (VERIFIED)\nBlacklist check: PASSED\nSmart contract audit status: AUDITED\nSecurity recommendation: PROCEED WITH CAUTION";
        
        // Risk assessment agent review
        enhancedPrompt += "\n\nTool Response: [Risk Assessment Agent]\nAnalyzing risk profile...\nTransaction size: MEDIUM\nMarket volatility: LOW\nSlippage risk: MINIMAL\nPortfolio impact: 12% of holdings\nRisk level: MODERATE\nRisk recommendation: ACCEPTABLE";
        
        // Transaction simulation
        enhancedPrompt += "\n\nTool Response: [Transaction Simulator]\nSimulating transaction...\nGas cost: 0.002 ETH\nExpected price impact: 0.5%\nTransaction success probability: 99.8%\nSimulation result: SUCCESS";
    }
    
    if (userMessage.toLowerCase().includes('market') || userMessage.toLowerCase().includes('price')) {
        enhancedPrompt += "\n\nTool Response: [Market Data Agent]\nBTC: $63,245.78 (+2.3% 24h)\nETH: $3,076.45 (+1.2% 24h)\nSOL: $142.89 (+4.5% 24h)\nMarket sentiment: Bullish\nData as of " + new Date().toISOString();
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
    const content = await import('/app/lib/levels/flowcharts/level07.md');
    return {
        content: (content as any as {markdown: string}).markdown,
    };
}

export default function Level07() {
    const { content } = useLoaderData<typeof loader>();

    const initialMessages: Message[] = [{
        id: '1',
        content: 'I want to swap 1 ETH for SOL, is it safe?',
        sender: 'user',
        timestamp: new Date(Date.now() - 3000),
    }, {
        id: uuidv4(),
        content: "I've consulted with our security and risk assessment agents to evaluate your request to swap 1 ETH for SOL. Here's what they found:\n\n**Security Check**:\n- Your wallet is verified and secure\n- The swap contract is verified and audited\n- No blacklisted addresses involved\n\n**Risk Assessment**:\n- Transaction size: Medium (1 ETH represents 12% of your portfolio)\n- Current market volatility is low\n- Slippage risk is minimal\n- Overall risk level: MODERATE (acceptable)\n\n**Transaction Simulation**:\n- Estimated gas cost: 0.002 ETH\n- Expected price impact: 0.5%\n- Transaction success probability: 99.8%\n\nBased on current market data, 1 ETH ($3,076.45) will get you approximately 21.53 SOL at the current price of $142.89 per SOL.\n\nThe transaction appears safe to proceed. Would you like to execute this swap now?",
        sender: 'assistant',
        timestamp: new Date(),
    }];

    const suggestedMessages = ['Yes, execute the swap', 'What\'s the reputation of the SOL project?', 'Can I get a better rate elsewhere?'];

    return (
        <LevelLayout 
            levelNumber={7}
            mermaidJsChart={content}
            initialMessages={initialMessages}
            suggestedMessages={suggestedMessages}
        />
    );
} 