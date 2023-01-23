import express, { Application } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit'

import Controller from './interfaces/controller.interface';
import errorMiddleware from './middleware/error.middleware';

class App {
  public express: Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
      this.express = express();
      this.port = port;

      this.initialiseDatabaseConnection();
      this.initialiseMiddleware();
      this.initialiseControllers(controllers);
      this.initialiseErrorHandling();
  }

  private initialiseMiddleware(): void {
      this.express.use(helmet());
      this.express.use(cors());
      this.express.use(morgan('dev'));
      this.express.use(express.json());
      this.express.use(express.urlencoded({ extended: false }));
      this.express.use(compression());
      this.express.use(
        rateLimit({
          windowMs: 24 * 60 * 3, // next request to endpoint
          max: 100, // maximal request for all endpoint
          message: 'To many request, send back request after 3 minutes'
        })
      );
  }

  private initialiseControllers(controllers: Controller[]): void {
      controllers.forEach((controller: Controller) => {
          this.express.use('/api/v1', controller.router);
      });
  }

  private initialiseErrorHandling(): void {
      this.express.use(errorMiddleware);
  }

  private initialiseDatabaseConnection(): void {
      const { MONGO_DB } = process.env;
      try {
        mongoose.set('strictQuery', true);
        mongoose.connect(`${MONGO_DB}`);
        console.log("connected to mongodb");
      } catch (error) {
        console.log(error);
      }
  }

  public listen(): void {
      this.express.listen(this.port, () => {
          console.log(`App listening on the port ${this.port}`);
      });
  }
}

export default App;