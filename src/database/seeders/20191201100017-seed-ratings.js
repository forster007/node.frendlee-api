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
        {
          appointment_id: 2,
          customer_id: 1,
          customer_rating: 4,
          provider_id: 1,
          provider_rating: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          appointment_id: 3,
          customer_id: 1,
          customer_rating: 3,
          provider_id: 1,
          provider_rating: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          appointment_id: 4,
          customer_id: 1,
          customer_rating: 2,
          provider_id: 1,
          provider_rating: 2,
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
