module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'customer_parents',
      [
        {
          id: 1,
          customer_id: 1,
          parent_id: 1,
          customer_nickname: 'Daughter',
          parent_nickname: 'Mother',
          status: 'approved',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('customer_parents', null, {});
  },
};
