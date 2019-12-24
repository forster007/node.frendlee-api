module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'periods',
      [
        {
          enabled: true,
          name: 'Everydays',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          enabled: true,
          name: 'Holidays',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          enabled: true,
          name: 'Weekdays',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          enabled: true,
          name: 'Weekends',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('periods', null, {});
  },
};
