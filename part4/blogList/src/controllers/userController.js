import {Router} from "express";
import bcryptjs from 'bcryptjs';
import User from '../models/user.js';

const router = Router();

router.post('/', async (request, response) => {
  const {username, name, password} = request.body;
  const passwordHash = await bcryptjs.hash(password, 10);
  
  const user = new User({
    username,
    name,
    passwordHash
  });
  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

export default router;