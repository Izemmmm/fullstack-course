export default function extractToken(request, response, next) {
  const authHeader = request.get('authorization');
  if (!authHeader) {
    return next();
  }

  const token = authHeader.replace('Bearer ', '');
  request.token = token;

  next();
}