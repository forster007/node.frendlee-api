module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'provider_stuffs',
      [
        {
          provider_id: 1,
          stuff_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          provider_id: 1,
          stuff_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          provider_id: 1,
          stuff_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          provider_id: 2,
          stuff_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          provider_id: 2,
          stuff_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('provider_stuffs', null, {});
  },
};
