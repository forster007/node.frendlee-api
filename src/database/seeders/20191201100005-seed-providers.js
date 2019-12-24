module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'providers',
      [
        {
          address_id: 1,
          birthdate: '1994-01-30T00:00:00-03:00',
          formation: 'Backend developer',
          gender: 'male',
          gps: null,
          is_medical_provider: true,
          lastname: 'Forster',
          name: 'Thomas',
          onesignal: null,
          phone_number: '5193429393',
          phone_number_is_whatsapp: true,
          picture_address: null,
          picture_certification: null,
          picture_profile: null,
          picture_license: null,
          ssn: '91348536004',
          user_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('providers', null, {});
  },
};
