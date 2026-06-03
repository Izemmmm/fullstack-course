import mongoose from "mongoose";

let isNewContact;

if (process.argv.length === 3) {
  isNewContact = false;
}
else if (process.argv.length >= 5) {
  isNewContact = true;
}
else {
  console.log('arguments are missing');
  process.exit(1);
}

const [, , password, newName, newNumber] = process.argv;

const connectionString = `mongodb+srv://izemmmm:${password}@phonebook.qdkabxi.mongodb.net/phoneBook?appName=phoneBook`;

const isConnected = await connectDB(connectionString);

if (!isConnected) {
  console.log('Connection failed');
  process.exit(1);
}

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String
});
const BookRecord = mongoose.model('BookRecord', phoneBookSchema);
const newRecord = new BookRecord({name: newName, number: newNumber});

if (isNewContact) {
  const sentData = await addRecord(newRecord);
  const message = sentData ? 
    `added ${sentData.name} ${sentData.number} to phonebook`
    : 
    'Error while creating new contact';

  console.log(message);
}
else {
  const records = await getRecords(BookRecord);
  const message = records ? 'phonebook:\n' + 
    records.map(record => {
      return `${record.name} ${record.number}`;
    }).join('\n')
    : 
    'Error while fetching data';
  
  console.log(message);
}


async function connectDB(url) {
  try {
    await mongoose.connect(url, {family: 4});
    return true;
  } catch (error) {
    return false;
  }
}

async function addRecord(record) {
  try {
    const sentData = await record.save();
    mongoose.connection.close();
    return sentData;
  } catch (error) {
    return null;
  }
}

async function getRecords(model) {
  try {
    const records = await model.find({});
    mongoose.connection.close();
    return records;
  } catch (error) {
    return null;
  }
}