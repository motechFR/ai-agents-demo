import { ZodRawShape } from "zod";
import { getEthPrice, getEthPriceSchema, getEthPriceToolDefinition } from "server/lib/blockchain/getEthPrice";
import { ChatCompletionTool } from "openai/resources/chat/completions";
import { getPortfolioData, getPortfolioDataToolDefinition } from "../blockchain/getPortfolioData";
import { getPortfolioDataSchema } from "../blockchain/getPortfolioData";
import { getTokenQuoteSchema, getTokenQuote, getTokenQuoteToolDefinition, sellUSDCForWETH, sellUSDCForWETHToolDefinition, sellWETHForUSDC, sellWETHForUSDCToolDefinition, swapSchema } from "./defi";

type ToolDefinitionWithFunction = {
    tool: ChatCompletionTool;
    zodRawSchema: ZodRawShape;
    function: (args: any) => Promise<any> | any;
}

export const tools = {
    getEthPrice: {
        tool: getEthPriceToolDefinition,
        zodRawSchema: getEthPriceSchema.shape,
        function: getEthPrice,
    },
    getPortfolioData: {
        tool: getPortfolioDataToolDefinition,
        zodRawSchema: getPortfolioDataSchema.shape,
        function: getPortfolioData,
    },
    sellUSDCForWETH: {
        tool: sellUSDCForWETHToolDefinition,
        zodRawSchema: swapSchema.shape,
        function: sellUSDCForWETH,
    },
    sellWETHForUSDC: {
        tool: sellWETHForUSDCToolDefinition,
        zodRawSchema: swapSchema.shape,
        function: sellWETHForUSDC,
    },
    getTokenQuote: {
        tool: getTokenQuoteToolDefinition,
        zodRawSchema: getTokenQuoteSchema.shape,
        function: getTokenQuote,
    },
} satisfies Readonly<Record<string, ToolDefinitionWithFunction>>;

export type ToolName = keyof typeof tools;

export async function runTool({ toolName, args, allowedTools }: { toolName: ToolName, args: Parameters<typeof tools[ToolName]['function']>[0]; allowedTools?: ToolName[]     }) {
    const tool = tools[toolName];

    if (!allowedTools || allowedTools.includes(toolName)) {

        try {
            const result = await tool.function(args as any);
            return result;
        } catch (error) {
            console.error(error);
            return {
                error: `Error running tool ${toolName}: ${typeof error !== 'object' ? error : JSON.stringify(error)}`,
            };
        }
    }

    return {
        error: `Tool ${toolName} is not allowed`,
    }
}



export function loadTools(toolNames: ToolName[]): ChatCompletionTool[] {
    const uniqueTools = [...new Set<ToolName>(toolNames)];
    return uniqueTools.map(toolname => {
        const tool = tools[toolname];
        return tool.tool;
    });
}
