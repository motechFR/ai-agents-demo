import Router, { RouterContext } from 'koa-router';

export const healthRouter = new Router();

healthRouter.get('/health', (ctx: RouterContext) => {
  ctx.body = { status: 'ok' };
});


healthRouter.post('/health', async (ctx: RouterContext) => {
  const { message } = ctx.request.body as { message: string };

  const response = {
    message: 'Hello, world!',
    received: message,
  };

  ctx.body = response;
});
