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
          resource: `${process.env.PREFIX}/providers`,
        },
        {
          action: 'allow',
          methods: ['POST'],
          resource: `${process.env.PREFIX}/customers/files`,
        },
      ],
    },
    {
      group: 'provider',
      permissions: [
        {
          action: 'allow',
          methods: ['POST'],
          resource: `${process.env.PREFIX}/providers/files`,
        },
      ],
    },
    {
      group: 'guest',
      permissions: [{ action: 'allow', methods: '*', resource: 'files/*' }],
    },
  ],
};
