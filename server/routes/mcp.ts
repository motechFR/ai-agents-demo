import Router, { RouterContext } from 'koa-router';
import { loadMcpServer } from 'server/lib/mcp/server';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
// Define capabilities once to reuse in GET and POST handlers

const mcpServer = loadMcpServer()

const apiRoute = '/mcp';

// Handle a single SSE transport
const transportRef = {
  transport: null as SSEServerTransport | null,
}

export const mcpRouter = new Router({
  prefix: apiRoute
});

// GET endpoint returns capabilities directly
mcpRouter.get('/sse', async (ctx: RouterContext) => {
   
    console.log('SSE endpoint hit');

    // Set headers required for SSE
    ctx.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no' // Disable nginx buffering if you're using it
    });
  
    // Prevent Koa from closing the connection automatically
    ctx.respond = false;
  
    const messageUrl = `${apiRoute}/message`;
  
    const sseTransport = new SSEServerTransport(messageUrl, ctx.res);
  
    transportRef.transport = sseTransport;
  
    await mcpServer.connect(sseTransport);
  
    // Handle connection close
    ctx.req.on('close', () => {
      sseTransport.close().catch(err => {
        console.error('Error disconnecting SSE transport:', err);
      });
    });
});

// POST endpoint handles method execution
mcpRouter.post('/message', async (ctx: RouterContext) => {

  console.log('POST endpoint hit');

  const sseTransport = transportRef.transport;

  if (!sseTransport) {
    ctx.status = 500;
    ctx.body = { error: 'SSE transport not initialized' };
    return;
  }

  ctx.respond = false;


  await sseTransport.handlePostMessage(ctx.req, ctx.res, ctx.request.body);
});
