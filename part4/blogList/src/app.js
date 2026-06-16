import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import blogRouter from './controllers/blogController.js';
import userRouter from './controllers/userController.js';
import loginRouter from './controllers/loginController.js';
import errorHandler from './middleware/errorHandler.js';
import badRouteHandler from './middleware/badRouteHandler.js';
import tokenExtractor from './middleware/tokenExtractor.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(tokenExtractor);
app.use('/api/users', userRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/login', loginRouter);
app.use(badRouteHandler);
app.use(errorHandler);

export default app;