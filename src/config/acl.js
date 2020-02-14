const PREFIX = process.env.BASE_PREFIX;

export default {
  roleSearchPath: 'headers.account_type',
  rules: [
    {
      group: 'administrator',
      permissions: [{ action: 'allow', methods: '*', resource: '*' }],
    },
    {
      group: 'customer',
      permissions: [
        {
          action: 'allow',
          methods: ['GET'],
          resource: `${PREFIX}/providers`,
        },
        {
          action: 'allow',
          methods: ['POST'],
          resource: `${PREFIX}/customers/files`,
        },
      ],
    },
    {
      group: 'provider',
      permissions: [
        {
          action: 'allow',
          methods: ['POST'],
          resource: `${PREFIX}/providers/files`,
        },
      ],
    },
    {
      group: 'guest',
      permissions: [
        { action: 'allow', methods: '*', resource: 'confirmation' },
        { action: 'allow', methods: '*', resource: 'files/*' },
      ],
    },
  ],
};
