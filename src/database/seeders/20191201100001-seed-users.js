module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          account_type: 'administrator',
          email: 'thomas_forster@hotmail.com.br',
          password_hash:
            '$2y$08$a9/fbQ5EUt5xHjOTIpN51Ozrq5gNATGMf1koRl2rPf6st00uCzudm',
          status: 'enabled',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          account_type: 'customer',
          email: 'imperator.03@hotmail.com',
          password_hash:
            '$2y$08$Ab5XuM1hi6xmQRnH3iIJPOF.hTtWuXUgOIuVrAk2josppnLC4T6A6',
          status: 'enabled',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          account_type: 'provider',
          email: 'forster007@gmail.com',
          password_hash:
            '$2y$08$Ab5XuM1hi6xmQRnH3iIJPOF.hTtWuXUgOIuVrAk2josppnLC4T6A6',
          status: 'enabled',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          account_type: 'provider',
          email: 'andre@gmail.com',
          password_hash:
            '$2y$08$Ab5XuM1hi6xmQRnH3iIJPOF.hTtWuXUgOIuVrAk2josppnLC4T6A6',
          status: 'enabled',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
