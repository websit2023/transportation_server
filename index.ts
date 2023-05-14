import express, { Express, NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routers';
import * as bodyParser from 'body-parser';
import morgan from 'morgan'
import cors from 'cors'
import { Exception } from './utils/exception';
dotenv.config();

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const app: Express = express();
const port = process.env.PORT;

mongoose.connect('mongodb+srv://anpham112:anpham116@cluster0.gpaywws.mongodb.net')
  .then(() => console.log('Connected!'));

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(morgan("tiny"))

// Routers 
app.use("/", router);

// Add an error handling middleware
app.use((err: Exception, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Exception) {
    // Handle the custom exception by returning a JSON response with the error message and status code
    res.status(err.statusCode).json({ message: err.message });
  } else {
    // Pass the error to the next error handling middleware
    next(err);
  }
});


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});