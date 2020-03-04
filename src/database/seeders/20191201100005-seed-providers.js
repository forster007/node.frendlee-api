module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'providers',
      [
        {
          address_id: 3,
          birthdate: '1994-01-30T00:00:00-03:00',
          description:
            'Born into a German Jewish family, he moved to a Switzerland at a young age and began her studies at the Polytechnic School Zurich. After two years looking for a job, a position was selected at the Swiss patent office of Zurich.',
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
          user_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          address_id: 4,
          birthdate: '1980-06-11T00:00:00-03:00',
          description:
            'Born into a German Jewish family, he moved to a Switzerland at a young age and began her studies at the Polytechnic School Zurich. After two years looking for a job, a position was selected at the Swiss patent office of Zurich.',
          formation: 'Backend developer',
          gender: 'male',
          gps: null,
          is_medical_provider: true,
          lastname: 'Scherrer',
          name: 'André',
          onesignal: null,
          phone_number: '51993396147',
          phone_number_is_whatsapp: true,
          picture_address: '6ccdb18a0b085ab02976ab8221a09ea3.jpg',
          picture_certification: '6ccdb18a0b085ab02976ab8221a09ea3.jpg',
          picture_profile: '6ccdb18a0b085ab02976ab8221a09ea3.jpg',
          picture_license: '6ccdb18a0b085ab02976ab8221a09ea3.jpg',
          ssn: '42940181004',
          user_id: 5,
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
