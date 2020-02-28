module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'provider_services',
      [
        {
          provider_id: 1,
          service_id: 1,
          value: 150.0,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          provider_id: 1,
          service_id: 2,
          value: 75.0,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          provider_id: 2,
          service_id: 1,
          value: 150.0,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          provider_id: 2,
          service_id: 2,
          value: 75.0,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('provider_services', null, {});
  },
};
