import mongoose from "mongoose";
import {before, after} from "node:test";

before(async () => {
  await mongoose.connect(process.env.TEST_MONGO_URI, { family: 4 });
});

after(async () => {
  await mongoose.connection.close();
});