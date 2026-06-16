import {Router} from 'express';
import User from '../models/user.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/', async (request, response) => {
  const {username, password} = request.body;
  const user = await User.findOne({username});

  const isAuthorized = user === null 
    ? false
    : await bcryptjs.compare(password, user.passwordHash);

  if (!isAuthorized) {
    return response.status(401).json({error: 'username or password is invalid'});
  }

  const token = jwt.sign({
      id: user._id,
      username: user. username
    },
    process.env.SECRET,
    {expiresIn: 60*60});
  
  response.json({token, username: user.username, name: user.name});
});

export default router;