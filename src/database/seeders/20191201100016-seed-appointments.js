const moment = require('moment');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'appointments',
      [
        {
          start_at: moment()
            .add(1, 'hours')
            .format(),
          duration: 1,
          finish_at: moment()
            .add(2, 'hours')
            .format(),
          observation:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
          status: 'confirmed',
          value: 150.0,
          address: 'Rua São Nicolau, 480 - Estância Velha, Canoas - RS, Brasil',
          customer_id: 1,
          customer_rating: false,
          provider_id: 1,
          provider_rating: false,
          provider_service_id: 1,
          created_at: new Date(),
          payed_at: null,
          started_at: null,
          finished_at: null,
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('appointments', null, {});
  },
};
