module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'providers',
      [
        {
          address_id: 1,
          birthdate: '1994-01-30T00:00:00-03:00',
          formation: 'Mobile developer',
          gender: 'male',
          gps: null,
          is_medical_provider: true,
          lastname: 'Forster',
          name: 'Thomas',
          onesignal: null,
          phone_number: '51993429393',
          phone_number_is_whatsapp: true,
          picture_address: '6ccdb18a0b085ab02976ab8221a09ea0.jpg',
          picture_certification: '6ccdb18a0b085ab02976ab8221a09ea0.jpg',
          picture_profile: '6ccdb18a0b085ab02976ab8221a09ea0.jpg',
          picture_license: '6ccdb18a0b085ab02976ab8221a09ea0.jpg',
          ssn: '91348536004',
          user_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          address_id: 2,
          birthdate: '1980-06-11T00:00:00-03:00',
          formation: 'Backend developer',
          gender: 'male',
          gps: null,
          is_medical_provider: true,
          lastname: 'Sanchez',
          name: 'André',
          onesignal: null,
          phone_number: '51993396147',
          phone_number_is_whatsapp: true,
          picture_address: '6ccdb18a0b085ab02976ab8221a09ea2.jpg',
          picture_certification: '6ccdb18a0b085ab02976ab8221a09ea2.jpg',
          picture_profile: '6ccdb18a0b085ab02976ab8221a09ea2.jpg',
          picture_license: '6ccdb18a0b085ab02976ab8221a09ea2.jpg',
          ssn: '42940181004',
          user_id: 4,
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
