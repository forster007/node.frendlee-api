module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'ratings',
      [
        {
          appointment_id: 1,
          customer_id: 1,
          customer_rating: 5,
          provider_id: 1,
          provider_rating: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('ratings', null, {});
  },
};
