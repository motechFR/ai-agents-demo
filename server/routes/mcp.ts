import Router, { RouterContext } from 'koa-router';
import { loadMcpServer } from 'server/lib/mcp/server';

// Define capabilities once to reuse in GET and POST handlers

const mcpServer = loadMcpServer()

export const healthRouter = new Router({
  prefix: '/mcp'
});

// GET endpoint returns capabilities directly
healthRouter.get('/', (ctx: RouterContext) => {
  ctx.body = {
    ...serverCapabilities
  }
});

// POST endpoint handles method execution
healthRouter.post('/', async (ctx: RouterContext) => {
  const { method, params } = ctx.request.body as { 
    method: string; 
    params?: Record<string, unknown>;
  };

  // Handle different methods based on the payload
  switch (method) {
    case 'getQuote':
      ctx.body = { price: 42.0 };
      break;
    
    case 'executeTrade':
      ctx.body = { status: "success" };
      break;
      
    case 'listResources':
      ctx.body = {
        resources: [
          {
            uri: "file:///example.txt",
            name: "Example Resource",
          },
        ],
      };
      break;
      
    case 'readResource':
      if (params?.uri === "file:///example.txt") {
        ctx.body = {
          contents: [
            {
              uri: "file:///example.txt",
              mimeType: "text/plain",
              text: "This is the content of the example resource.",
            },
          ],
        };
      } else {
        ctx.status = 404;
        ctx.body = { error: "Resource not found" };
      }
      break;
      
    default:
      ctx.status = 400;
      ctx.body = { error: "Method not supported" };
  }
});
