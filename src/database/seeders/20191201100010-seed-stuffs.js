module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'stuffs',
      [
        {
          enabled: true,
          name: 'Arts and culture',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          enabled: true,
          name: 'Entertainment',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          enabled: true,
          name: 'Sports',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          enabled: true,
          name: 'Technology',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('stuffs', null, {});
  },
};
