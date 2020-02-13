export default {
  path: [
    { url: `${process.env.PREFIX}/checks`, methods: ['GET'] },
    { url: `${process.env.PREFIX}/clocks`, methods: ['GET'] },
    { url: `${process.env.PREFIX}/confirmations`, methods: ['GET'] },
    { url: `${process.env.PREFIX}/periods`, methods: ['GET'] },
    { url: `${process.env.PREFIX}/resends`, methods: ['GET'] },
    { url: `${process.env.PREFIX}/services`, methods: ['GET'] },
    { url: `${process.env.PREFIX}/stuffs`, methods: ['GET'] },
    { url: `${process.env.PREFIX}/customers`, methods: ['POST'] },
    { url: `${process.env.PREFIX}/providers`, methods: ['POST'] },
    { url: `${process.env.PREFIX}/sessions`, methods: ['POST'] },
  ],
};
