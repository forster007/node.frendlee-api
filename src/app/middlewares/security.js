export default async (req, res, next) => {
  try {
    const { headers, method, path } = req;

    if (headers.account_type === 'administrator') {
      return next();
    }

    const block = [
      { method: 'ANY', path: '/api/administrators' },
      { method: 'ANY', path: '/api/users' },
      { method: 'DELETE||POST||PUT', path: '/api/clocks' },
      { method: 'DELETE||POST||PUT', path: '/api/periods' },
      { method: 'DELETE||POST||PUT', path: '/api/services' },
      { method: 'DELETE||POST||PUT', path: '/api/stuffs' },
    ];

    block.forEach(e => {
      const regex = new RegExp(method, 'gi');
      if (
        (e.method === 'ANY' && e.path === path) ||
        (e.method.match(regex) && e.path === path)
      ) {
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
