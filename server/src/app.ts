import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

import { logger } from './utils/logger';
import { routes } from './routes';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(morgan(':method :url :response-time'));

app.use('/api', routes);

app.get("/", async (req: Request, res: Response) => {
  res.send("CineLog API");
});

/* Start the Express app and listen for incoming requests on the specified port */
app.listen(port, () => {
  logger.info({
    message: `[server]: Server is running at http://${process.env.API_BASE_URL}:${port}`
  });
});
