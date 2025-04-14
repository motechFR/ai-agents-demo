import { getEthPrice, getEthPriceToolDefinition } from "./getEthPrice";
import { ChatCompletionTool } from "openai/resources/chat/completions";

type ToolDefinitionWithFunction = {
    tool: ChatCompletionTool;
    function: (args: any) => Promise<any> | any;
}

export const tools = {
    getEthPrice: {
        tool: getEthPriceToolDefinition,
        function: getEthPrice,
    },
} satisfies Readonly<Record<string, ToolDefinitionWithFunction>>;

export type ToolName = keyof typeof tools;

export async function runTool({ toolName, args, allowedTools }: { toolName: ToolName, args: Parameters<typeof tools[ToolName]['function']>[0]; allowedTools?: ToolName[]     }) {
    const tool = tools[toolName];

    if (!allowedTools || allowedTools.includes(toolName)) {

        try {
            const result = await tool.function(args);
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
