import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { authConfig } from '../../config';

export default async (req, res, next) => {
  const { method, path } = req;

  // skip auth middleware when it is used to store a new PROVIDER or CUSTOMER
  if (
    (method === 'POST' && path === '/api/customers') ||
    (method === 'POST' && path === '/api/providers') ||
    (method === 'POST' && path === '/api/sessions')
  ) {
    return next();
  }

  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).json({ error: 'Token not provided' });

  const [, token] = authorization.split(' ');
  try {
    const { account_type, id } = await promisify(jwt.verify)(
      token,
      authConfig.secret
    );

    req.headers.account_type = account_type;
    req.headers.id = id;

    return next();
  } catch (e) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
