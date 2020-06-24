module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'parents',
      [
        {
          birthdate: '1994-12-03T00:00:00-03:00',
          gender: 'female',
          lastname: 'Imperator',
          name: 'Jennifer',
          onesignal: null,
          phone_number: '51981605401',
          phone_number_is_whatsapp: true,
          picture_profile: '6ccdb18a0b085ab02976ab8221a09ea1.jpg',
          user_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('parents', null, {});
  },
};
