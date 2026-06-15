export default function errorHandler(err, req, res, next) {
  if (err.name === 'ValidationError') {
    return res.status(400).json({error: err.message});
  } else if (err.name === 'MongoServerError' && err.code === 11000) {
    return res.status(400).json({error: 'duplicate key'});
  }

  console.log('error:', err.message);
  return res.status(500).json({error: 'something went wrong'});
}