module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'clocks',
      [
        {
          enabled: true,
          name: '24 hours',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          enabled: true,
          name: 'Business hours - 8AM at 6PM',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          enabled: true,
          name: 'Extended business hours - 6AM at 6PM',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('clocks', null, {});
  },
};
