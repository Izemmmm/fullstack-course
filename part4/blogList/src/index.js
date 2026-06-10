import app from './app.js';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 3003;

try {
  await mongoose.connect(process.env.MONGO_URI, { family: 4 });
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (error) {
  console.log('Connection failed:', error);
}
