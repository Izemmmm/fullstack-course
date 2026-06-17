import User from '../models/user.js';
import jwt from 'jsonwebtoken';

export default async function extractToken(request, response, next) {
  if (!request.token) {
    return response.status(401).json({error: 'invalid token'})
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({error: 'invalid token'})
  }

  const user = await User.findById(decodedToken.id);
  request.user = user;

  next();
}