module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'provider_periods',
      [
        {
          period_id: 1,
          provider_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          period_id: 2,
          provider_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          period_id: 3,
          provider_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          period_id: 4,
          provider_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('provider_periods', null, {});
  },
};
