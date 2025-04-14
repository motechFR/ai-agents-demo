import Router, { RouterContext } from 'koa-router';

export const healthRouter = new Router({
    prefix: '/mcp'
});

healthRouter.get('/', (ctx: RouterContext) => {
  ctx.body = { status: 'ok' };
});


healthRouter.post('/', async (ctx: RouterContext) => {

  ctx.body = {
    action: 'mcp',
  };
});
