module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'customer_tokens',
      [
        {
          id: 1,
          customer_id: 1,
          token: 'C$DzHr#N0xSs',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('customer_tokens', null, {});
  },
};
