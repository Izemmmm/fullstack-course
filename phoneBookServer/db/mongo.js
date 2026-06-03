import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const dbUri = process.env.MONGODB_URI;

mongoose.connect(dbUri, {family: 4})
  .then(result => console.log('Connected to MongoDB'))
  .catch(e => console.log('Connection failed:', e));

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Person = mongoose.model('Person', personSchema);

function getPersons() {
  
  return Person.find({});
}

function getPersonById(id) {
  return Person.find({id: id});
}

function getPersonByName(name) {
  return Person.find({name: name});
}

function addPerson(name, number) {
  const newPerson = new Person({name: name, number: number});
  return newPerson.save();
}

export default {getPersons, getPersonById, getPersonByName, addPerson};