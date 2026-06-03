import express, { json } from "express";
import morgan from "morgan";
import persons from "../db/mongo.js";

const app = express();

app.use(express.static('dist'));
app.use(express.json());

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/api/persons', (request, response) => {
  persons
    .getPersons()
    .then(persons => {
      console.log('get all', persons);
      response.send(persons);
    })
    .catch(e => console.log(e));
});

app.get('/api/persons/:id', (request, response) => {
  persons
    .getPersonById(request.params.id)
    .then(person => response.send(person))
    .catch(e => response.sendStatus(404));
});

app.get('/info', (request, response) => {
  const info = `Phone book has info for ${persons.length} people\n${new Date()}`;
  response.send(info);
});

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({error: "name is missing"})
  }

  if (!body.number) {
    return response.status(400).json({error: "number is missing"})
  }
  
  persons
    .getPersonByName(body.name)
    .then(person => {
      if (person.length) {
        console.log(`person ${body.name} found`, person);
        return response.status(400).json({error: "person already exists"});
      }
      else{
        console.log(`person ${body.name} not found`);
        return persons
                 .addPerson(body.name, body.number)
                 .then(addedPerson => {
                   return response.send({name: body.name, number: body.number});
                 });
      }
    })
    .catch(e => console.log('error occured while creating person', e));
});

app.delete('/api/persons/:id', (request, response) => {
  const index = persons.findIndex(person => person.id === request.params.id);
  if (index === -1){
    return response.sendStatus(204);
  }

  persons.splice(index, 1);
  response.sendStatus(204);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running. Port: ${port}`);
});