module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'administrators',
      [
        {
          birthdate: '1994-01-30T00:00:00-03:00',
          gender: 'male',
          lastname: 'Forster',
          name: 'Thomas',
          phone_number: '51982809822',
          phone_number_is_whatsapp: true,
          ssn: '01758240024',
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('administrators', null, {});
  },
};
