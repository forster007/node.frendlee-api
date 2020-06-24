module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'services',
      [
        {
          enabled: true,
          max_value: 200.0,
          min_value: 100.0,
          name: 'I can provide medical support',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          enabled: true,
          max_value: 100.0,
          min_value: 50.0,
          name: 'I cannot provide medical support',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('services', null, {});
  },
};
