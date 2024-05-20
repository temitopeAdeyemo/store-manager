import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
import cors from '../../src/shared/middlewares/corsOptions';
import helmet from 'helmet';
import morganConfig from '../../src/shared/middlewares/morganConfig';
import 'express-async-errors';
import environment from '../../src/config/environments.config';
import mongoSanitize from 'express-mongo-sanitize';
import errorHandler from '../../src/shared/middlewares/errorHandler';
import rateLimiter from '../../src/shared/middlewares/rateLimiter';
import routes from '../../src/shared/routes';
import JsonResponse from '../../src/shared/utils/AppSuccess';
import { morganMiddleware, systemLogs } from '../../src/shared/utils/Logger';
import chalk from 'chalk';
import 'express-async-errors';

export default class App {
  app: express.Application;
  constructor() {
    this.app = express();
    this.app.use(morganConfig);
    this.app.use(morganMiddleware);
    this.app.use(cors);
    this.app.options('*', cors);
    this.app.use(helmet());
    this.app.use(mongoSanitize());

    this.app.use(express.json());
    this.app.use(rateLimiter);

    this.setRoutes();

    this.app.use((response: any, req: Request, res: Response, next: NextFunction) => {
      if (response instanceof JsonResponse) {
        return res.status(response.statusCode).json(response.data);
      }

      next(response);
    });

    this.app.use(errorHandler);

    this.app.use((request: Request, response: Response) => {
      return response.status(404).json({
        success: true,
        message: 'Endpoint not found.',
      });
    });

    process.on('SIGINT', () => {
      process.exit();
    });
  }

  setRoutes() {
    this.app.get('/', (request: Request, response: Response) => {
      response.status(200).json({
        success: true,
        message: 'Welcome To store manager!',
      });
    });

    this.app.use('/api/v1', routes);
  }

  getApp() {
    return this.app;
  }

  listen() {
    const { port } = environment;
    this.app.listen(port, () => {
      console.log(`${chalk.green.bold('✓')} 👍 Server running on ${chalk.yellow.bold(process.env.NODE_ENV)} mode on port ${chalk.yellow.blue(port)}`);
      systemLogs.info(`Server running on ${process.env.NODE_ENV} mode on port ${port}`);
    });
  }
}
