import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { authConfig } from '../../config';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).json({ error: 'Token not provided' });

  const [, token] = authorization.split(' ');
  try {
    const { id } = await promisify(jwt.verify)(token, authConfig.secret);
    req.headers.user_id = id;

    return next();
  } catch (e) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
