module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'customer_parents',
      [
        {
          customer_id: 1,
          parent_id: 1,
          customer_nickname: 'Daughter',
          parent_nickname: 'Mother',
          status: 'approved',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          customer_id: 2,
          parent_id: 1,
          customer_nickname: null,
          parent_nickname: null,
          status: 'waiting',
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
