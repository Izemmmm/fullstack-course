import express from "express";
import cors from "cors";
import persons from "../data/persons.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/persons', (request, response) => {
  response.send(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const person = persons.find(person => person.id === request.params.id)
  if (!person) {
    return response.sendStatus(404);
  }
  response.send(person);
});

app.get('/info', (request, response) => {
  const info = `Phone book has info for ${persons.length} people\n${new Date()}`;
  response.send(info);
});

app.post('/api/persons', (request, response) => {
  console.log("post header", request.headers);
  console.log("post body", request.body);
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({error: "name is missing"})
  }

  if (!body.number) {
    return response.status(400).json({error: "number is missing"})
  }
  
  if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({error: "person already exists"})
  }

  const newId = Math.floor(Math.random() * 1000000);
  const newPerson = {name: body.name, number: body.number, id: String(newId)};

  console.log("persons before post", persons);
  persons.push(newPerson);
  console.log("persons after post", persons);
  response.send(newPerson);
});

app.delete('/api/persons/:id', (request, response) => {
  const index = persons.findIndex(person => person.id === request.params.id);
  if (index === -1){
    return response.sendStatus(204);
  }

  persons.splice(index, 1);
  response.sendStatus(204);
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running. Port: ${port}`);
});