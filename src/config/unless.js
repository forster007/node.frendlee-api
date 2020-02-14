const PREFIX = process.env.BASE_PREFIX;

export default {
  path: [
    { url: `${PREFIX}/checks`, methods: ['GET'] },
    { url: `${PREFIX}/clocks`, methods: ['GET'] },
    { url: `${PREFIX}/confirmations`, methods: ['GET'] },
    { url: `${PREFIX}/periods`, methods: ['GET'] },
    { url: `${PREFIX}/resends`, methods: ['GET'] },
    { url: `${PREFIX}/services`, methods: ['GET'] },
    { url: `${PREFIX}/stuffs`, methods: ['GET'] },
    { url: `${PREFIX}/customers`, methods: ['POST'] },
    { url: `${PREFIX}/providers`, methods: ['POST'] },
    { url: `${PREFIX}/sessions`, methods: ['POST'] },
  ],
};
