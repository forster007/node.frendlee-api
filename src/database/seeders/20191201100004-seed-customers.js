module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'customers',
      [
        {
          address_id: 1,
          birthdate: '1978-06-18T00:00:00-03:00',
          blood_pressure: 'normal',
          gender: 'female',
          gps: null,
          have_allergy: false,
          have_diseases: false,
          have_treatment: false,
          lastname: 'Imperator',
          name: 'Cristiane',
          onesignal: null,
          phone_number: '51993797008',
          phone_number_is_whatsapp: true,
          picture_profile: '6ccdb18a0b085ab02976ab8221a09ea2.jpg',
          ssn: '88372588015',
          user_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('customers', null, {});
  },
};
