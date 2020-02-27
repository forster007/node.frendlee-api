module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'appointments',
      [
        {
          start_at: '2019-12-27T08:00:00-03:00',
          duration: 1,
          finish_at: '2019-12-27T09:00:00-03:00',
          observation: 'Observação de teste 1.',
          status: 'finished',
          value: 150.0,
          address:
            'Rua São Nicolau - 480 - Estância Velha - Canoas - RS - Brasil - 92032440',
          customer_id: 1,
          provider_id: 1,
          provider_service_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          start_at: '2019-12-27T10:00:00-03:00',
          duration: 1,
          finish_at: '2019-12-27T11:00:00-03:00',
          observation: 'Observação de teste 2.',
          status: 'finished',
          value: 75.0,
          address:
            'Rua São Nicolau - 480 - Estância Velha - Canoas - RS - Brasil - 92032440',
          customer_id: 1,
          provider_id: 1,
          provider_service_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          start_at: '2019-12-27T13:00:00-03:00',
          duration: 1,
          finish_at: '2019-12-27T14:00:00-03:00',
          observation: 'Observação de teste 3.',
          status: 'finished',
          value: 150.0,
          address:
            'Rua São Nicolau - 480 - Estância Velha - Canoas - RS - Brasil - 92032440',
          customer_id: 1,
          provider_id: 2,
          provider_service_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          start_at: '2019-12-27T15:00:00-03:00',
          duration: 1,
          finish_at: '2019-12-27T16:00:00-03:00',
          observation: 'Observação de teste 4.',
          status: 'finished',
          value: 75.0,
          address:
            'Rua São Nicolau - 480 - Estância Velha - Canoas - RS - Brasil - 92032440',
          customer_id: 1,
          provider_id: 2,
          provider_service_id: 2,
          created_at: new Date(),
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
