import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { authConfig } from '../../config';

export default async (req, res, next) => {
  try {
    const { method, path } = req;
    const regexConfirmation = new RegExp('/confirmation', 'gim');
    const regexChecks = new RegExp('/checks', 'gim');
    const regexClocks = new RegExp('/clocks', 'gim');
    const regexConfirmations = new RegExp('/confirmations', 'gim');
    const regexFiles = new RegExp('/files', 'gim');
    const regexPeriods = new RegExp('/periods', 'gim');
    const regexResends = new RegExp('/resends', 'gim');
    const regexServices = new RegExp('/services', 'gim');
    const regexStuffs = new RegExp('/stuffs', 'gim');

    if (
      (method === 'POST' && path === '/api/customers') ||
      (method === 'POST' && path === '/api/providers') ||
      (method === 'POST' && path === '/api/sessions') ||
      (method === 'GET' && path.match(regexConfirmation)) ||
      (method === 'GET' && path.match(regexChecks)) ||
      (method === 'GET' && path.match(regexClocks)) ||
      (method === 'GET' && path.match(regexConfirmations)) ||
      (method === 'GET' && path.match(regexFiles)) ||
      (method === 'GET' && path.match(regexPeriods)) ||
      (method === 'GET' && path.match(regexResends)) ||
      (method === 'GET' && path.match(regexServices)) ||
      (method === 'GET' && path.match(regexStuffs))
    ) {
      return next();
    }

    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error('Token not provided');
    }

    const [, token] = authorization.split(' ');
    const { account_type, id } = await promisify(jwt.verify)(token, authConfig.secret);

    req.headers.account_type = account_type;
    req.headers.id = id;

    return next();
  } catch (e) {
    return res.status(e.status || 401).json({
      error: e.message || 'Token invalid',
    });
  }
};
