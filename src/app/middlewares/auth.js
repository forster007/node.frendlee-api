import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { authConfig } from '../../config';

export default async (req, res, next) => {
  try {
    const { method, path } = req;

    if (
      (method === 'POST' && path === '/api/customers') ||
      (method === 'POST' && path === '/api/providers') ||
      (method === 'POST' && path === '/api/sessions')
    ) {
      return next();
    }

    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error('Token not provided');
    }

    const [, token] = authorization.split(' ');
    const { account_type, id } = await promisify(jwt.verify)(
      token,
      authConfig.secret
    );

    req.headers.account_type = account_type;
    req.headers.id = id;

    return next();
  } catch (e) {
    return res.status(e.status || 401).json({
      error: e.message || 'Token invalid',
    });
  }
};
