export default async (req, res, next) => {
  try {
    const { headers, method, path } = req;

    if (headers.account_type === 'administrator') {
      return next();
    }

    const block = [
      { m: 'DELETE||POST||PUT', p: '/api/clocks' },
      { m: 'DELETE||POST||PUT', p: '/api/periods' },
      { m: 'DELETE||POST||PUT', p: '/api/services' },
      { m: 'DELETE||POST||PUT', p: '/api/stuffs' },
      { m: 'ANY', p: '/api/users' },
    ];

    block.forEach(({ m, p }) => {
      const regex = new RegExp(method, 'gi');
      if ((m === 'ANY' && p === path) || (m.match(regex) && p === path)) {
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
