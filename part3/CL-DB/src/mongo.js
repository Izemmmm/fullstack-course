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

connectDB(connectionString).then(isConnected => {
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
    addRecord(newRecord).then(sentData => {
      const message = sentData ?
        `added ${sentData.name} ${sentData.number} to phonebook`
        :
        'Error while creating new contact';

      console.log(message);
    });
  }
  else {
    getRecords(BookRecord).then(records => {
      const message = records ? 'phonebook:\n' +
        records.map(record => {
          return `${record.name} ${record.number}`;
        }).join('\n')
        :
        'Error while fetching data';

      console.log(message);
    });
  }
});


function connectDB(url) {
  return mongoose.connect(url, {family: 4})
    .then(() => true)
    .catch(() => false);
}

function addRecord(record) {
  return record.save()
    .then(sentData => {
      mongoose.connection.close();
      return sentData;
    })
    .catch(() => null);
}

function getRecords(model) {
  return model.find({})
    .then(records => {
      mongoose.connection.close();
      return records;
    })
    .catch(() => null);
}