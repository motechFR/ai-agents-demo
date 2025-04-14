import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { ToolName, tools } from 'server/lib/tools/index';


// Create server instance
export function loadMcpServer() {
    const mcpServer = new McpServer({
        name: 'mcp',
        version: '1.0.0'
      });

    const toolNames = Object.keys(tools) as ToolName[];
 
    for (const toolName of toolNames) {
        const tool = tools[toolName];
        const functionDefinition = tool.tool.function;
        mcpServer.tool(toolName, functionDefinition.description!, tool.zodRawSchema, async (payload: any) => {
            console.log('payload', payload);
            const result = await tool.function(payload);

            const response: CallToolResult = {
                isError: false,
                content: [{
                    text: JSON.stringify(result, null, 2),
                    type: 'text'
                }]
            }
            return response;
        }
    );
    }

    return mcpServer;
}


