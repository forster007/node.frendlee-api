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
          methods: ['GET', 'POST', 'PUT'],
          resource: `${PREFIX}/appointments/*`,
        },
        {
          action: 'allow',
          methods: ['GET'],
          resource: `${PREFIX}/customers/*`,
        },
        {
          action: 'allow',
          methods: ['POST'],
          resource: `${PREFIX}/customers/files`,
        },
        {
          action: 'allow',
          methods: ['POST'],
          resource: `${PREFIX}/onesignal`,
        },
        {
          action: 'allow',
          methods: ['GET'],
          resource: `${PREFIX}/providers`,
        },
        {
          action: 'allow',
          methods: ['GET'],
          resource: `${PREFIX}/providers/*`,
        },
      ],
    },
    {
      group: 'provider',
      permissions: [
        {
          action: 'allow',
          methods: ['GET', 'PUT'],
          resource: `${PREFIX}/appointments/*`,
        },
        {
          action: 'allow',
          methods: ['POST'],
          resource: `${PREFIX}/onesignal`,
        },
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
