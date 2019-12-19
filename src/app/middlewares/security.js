import Path from 'path';

export default async (req, res, next) => {
  try {
    const { headers, method, path } = req;

    if (headers.account_type === 'administrator') {
      return next();
    }

    if (method === 'DELETE') {
      throw new Error('You cannot access this route');
    }

    const fullLocks = ['/api/administrators', '/api/users'];
    const halfLocks = [
      { method: 'GET', path: '/api/customers' },
      { method: 'POST||PUT', path: '/api/clocks' },
      { method: 'POST||PUT', path: '/api/periods' },
      { method: 'POST||PUT', path: '/api/services' },
      { method: 'POST||PUT', path: '/api/stuffs' },
    ];

    fullLocks.forEach(e => {
      if (e === path) {
        throw new Error('You cannot access this route');
      }
    });

    halfLocks.forEach(e => {
      const regexMethod = new RegExp(method, 'gim');

      if (e.method.match(regexMethod) && e.path === path) {
        throw new Error('You cannot access this route');
      } else if (e.method.match(regexMethod) && e.path === Path.dirname(path)) {
        throw new Error('You cannot access this route');
      }
    });

    return next();
  } catch (e) {
    return res.status(e.status || 401).json({
      error: e.message || 'Token invalid',
    });
  }
};
