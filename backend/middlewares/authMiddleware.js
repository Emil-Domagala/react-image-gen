import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY;

export function enforceAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ error: 'Unauthorized' });
  }
  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, secretKey);
    next();
  } catch (error) {
    return res.status(401).send({ error: 'Unauthorized' });
  }
}
