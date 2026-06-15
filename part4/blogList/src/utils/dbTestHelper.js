import mongoose from "mongoose";
import {before, after} from "node:test";

const dbName = `test_db_${process.pid}`;

before(async () => {
  await mongoose.connect(`${process.env.TEST_MONGO_URI}`, {dbName: `test_db_${process.pid}`, family: 4 });
});

after(async () => {
  await mongoose.connection.close();
});