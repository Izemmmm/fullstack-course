import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import blogController from './controllers/blogController.js';
import userController from './controllers/userController.js';
import errorHandler from './middleware/errorHandler.js';
import badRouteHandler from './middleware/badRouteHandler.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/users', userController);
app.use('/api/blogs', blogController);
app.use(badRouteHandler);
app.use(errorHandler);

export default app;