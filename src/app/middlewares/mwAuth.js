import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { authConfig } from '../../config';

export default async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error('Token not provided');
    }

    const [, token] = authorization.split(' ');
    const { account_type, email, id, uid } = await promisify(jwt.verify)(token, authConfig.secret);

    req.headers.account_type = account_type;
    req.headers.email = email;
    req.headers.id = id;
    req.headers.uid = uid;

    return next();
  } catch (e) {
    return res.status(e.status || 401).json({
      error: e.message || 'Token invalid',
    });
  }
};
