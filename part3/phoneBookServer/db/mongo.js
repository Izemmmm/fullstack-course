import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const dbUri = process.env.MONGODB_URI;

mongoose.connect(dbUri, { family: 4 })
  .then(() => console.log('Connected to MongoDB'))
  .catch(e => console.log('Connection failed:', e));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      //numbers like +countrycode-num-num... are accepted|
      validator: value => /(^\+?\d+(-\d+)*$)/.test(value),
      message: props => `${props.value} is not a valid phone number`
    }
  }
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Person = mongoose.model('Person', personSchema);

function getAll() {

  return Person.find({});
}

function getById(id) {
  return Person.findById(id);
}

function getByName(name) {
  return Person.find({ name: name });
}

function getCount(filter = {}) {
  return Person.countDocuments(filter);
}

function add(name, number) {
  const newPerson = new Person({ name: name, number: number });
  return newPerson.save();
}

function update(id, personUpdate) {
  return Person
    .findById(id)
    .then(person => {
      console.log('person for update:', person);
      if (!person) {
        return null;
      }

      person.name = personUpdate.name;
      person.number = personUpdate.number;
      return person.save();
    });
}

function remove(id) {
  return Person.findByIdAndDelete(id);
}

export default { getAll, getById, getByName, getCount, add, update, remove };