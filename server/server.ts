import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { healthRouter } from './routes/health';
import { healthRouter as mcpRouter } from './routes/mcp';

const app = new Koa();

// Enable CORS
app.use(cors());

// Enable body parser
app.use(bodyParser());

// Register routes
app.use(healthRouter.routes()).use(healthRouter.allowedMethods());
app.use(mcpRouter.routes()).use(mcpRouter.allowedMethods());

export default app;
