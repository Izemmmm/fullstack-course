import {Router} from "express";
import bcryptjs from 'bcryptjs';
import User from '../models/user.js';

const router = Router();

router.post('/', async (request, response) => {
  const {username, name, password} = request.body;

  if (!password || password.length < 3) {
    return response.status(400).json({error: 'wrong password format'});
  }
  const passwordHash = await bcryptjs.hash(password, 10);
  if (!passwordHash) {
    return response.sendStatus(500);
  }
  
  const user = new User({
    username,
    name,
    passwordHash
  });
  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

export default router;