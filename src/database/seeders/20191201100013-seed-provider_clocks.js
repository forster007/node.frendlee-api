module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'provider_clocks',
      [
        {
          clock_id: 1,
          provider_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          clock_id: 2,
          provider_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('provider_clocks', null, {});
  },
};
