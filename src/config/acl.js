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
        { action: 'allow', methods: ['GET'], resource: '/addresses/*' },
        { action: 'allow', methods: ['GET', 'POST', 'PUT'], resource: '/appointments/*' },
        { action: 'allow', methods: ['GET', 'POST'], resource: '/customers/*' },
        { action: 'allow', methods: ['GET', 'POST', 'PUT'], resource: '/customerparents/*' },
        { action: 'allow', methods: ['POST'], resource: '/customertokens/*' },
        { action: 'allow', methods: ['GET', 'PUT'], resource: '/messages/*' },
        { action: 'allow', methods: ['POST'], resource: '/onesignal' },
        { action: 'allow', methods: ['POST'], resource: '/payments' },
        { action: 'allow', methods: ['GET'], resource: '/providers/*' },
        { action: 'allow', methods: ['POST'], resource: '/ratings' },
      ],
    },
    {
      group: 'parent',
      permissions: [
        { action: 'allow', methods: ['GET'], resource: '/addresses/*' },
        { action: 'allow', methods: ['GET', 'POST', 'PUT'], resource: '/appointments/*' },
        { action: 'allow', methods: ['GET', 'POST'], resource: '/customerparents' },
        { action: 'allow', methods: ['GET', 'PUT'], resource: '/messages/*' },
        { action: 'allow', methods: ['POST'], resource: '/onesignal' },
        { action: 'allow', methods: ['GET', 'POST'], resource: '/parents/*' },
        { action: 'allow', methods: ['POST'], resource: '/payments' },
        { action: 'allow', methods: ['GET'], resource: '/providers/*' },
      ],
    },
    {
      group: 'provider',
      permissions: [
        { action: 'allow', methods: ['GET'], resource: '/addresses/*' },
        { action: 'allow', methods: ['GET', 'PUT'], resource: '/appointments/*' },
        { action: 'allow', methods: ['GET', 'PUT'], resource: '/messages/*' },
        { action: 'allow', methods: ['POST'], resource: '/onesignal' },
        { action: 'allow', methods: ['GET', 'POST', 'PUT'], resource: '/providers/*' },
        { action: 'allow', methods: ['POST'], resource: '/ratings' },
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
