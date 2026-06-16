export default function errorHandler(err, req, res, next) {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({error: 'malformed JSON'});
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({error: err.message});
  } else if (err.name === 'MongoServerError' && err.code === 11000) {
    return res.status(400).json({error: 'duplicate key'});
  } else if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({error: 'invalid token'})
  }

  console.log('error:', err.name, err.message);
  return res.status(500).json({error: 'something went wrong'});
}