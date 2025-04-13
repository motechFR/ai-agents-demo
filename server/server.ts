import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { healthRouter } from './routes/health';

const app = new Koa();

// Enable CORS
app.use(cors());

// Enable body parser
app.use(bodyParser());

// Register routes
app.use(healthRouter.routes()).use(healthRouter.allowedMethods());

export default app;
