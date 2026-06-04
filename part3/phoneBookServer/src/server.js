import express, { json, request } from "express";
import cors from 'cors';
import morgan from "morgan";
import persons from "../db/mongo.js";

const app = express();

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/api/persons', (request, response, next) => {
  persons
    .getAll()
    .then(persons => {
      console.log('get all', persons);
      response.send(persons);
    })
    .catch(e => next(e));
});

app.get('/api/persons/:id', (request, response, next) => {
  persons
    .getById(request.params.id)
    .then(person => person ? response.send(person) : response.sendStatus(404))
    .catch(e => next(e));
});

app.get('/info', (request, response, next) => {
  persons
    .getCount()
    .then(count => {
      const info = `Phone book has info for ${count} people\n${new Date()}`;
      return response.send(info);
    })
    .catch(e => next(e));
});

app.post('/api/persons', (request, response, next) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({error: "name is missing"})
  }

  if (!body.number) {
    return response.status(400).json({error: "number is missing"})
  }
  
  persons
    .getByName(body.name)
    .then(person => {
      if (person.length) {
        console.log(`person ${body.name} found`, person);
        return response.status(400).json({error: "person already exists"});
      }
      else{
        console.log(`person ${body.name} not found`);
        return persons
                 .add(body.name, body.number)
                 .then(addedPerson => response.send(addedPerson));
      }
    })
    .catch(e => next(e));
});

app.put('/api/persons/:id', (request, response, next) => {
  persons
    .update(request.params.id, request.body)
    .then(updatedPerson => {
      if (!updatedPerson) {
        return response.sendStatus(404);
      }
      response.send(updatedPerson);
    })
    .catch(e => next(e)); 
});

app.delete('/api/persons/:id', (request, response, next) => {
  persons
    .remove(request.params.id)
    .then(response.sendStatus(204))
    .catch(e => next(e));
});

app.use((err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).send('bad id format');
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({error: err.message});
  }
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.sendStatus(500);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running. Port: ${port}`);
});