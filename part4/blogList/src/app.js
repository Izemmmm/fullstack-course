import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import blogController from './controllers/blogController.js';

dotenv.config();

const mongoUrl = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGO_URI
  : process.env.MONGO_URI;
mongoose.connect(mongoUrl, { family: 4 })
  .then(() => console.log('Connected to MongoDB'))
  .catch(e => console.log('Connection failed:', e));

const app = express();

app.use(express.json());
app.use('/api/blogs', blogController);

export default app;