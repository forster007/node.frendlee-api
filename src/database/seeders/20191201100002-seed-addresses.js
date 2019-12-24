module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'addresses',
      [
        {
          city: 'Canoas',
          complement: null,
          country: 'Brasil',
          district: 'Estância Velha',
          number: '480',
          postal_code: '92032440',
          state: 'Rio Grande do Sul',
          street: 'Rua São Nicolau',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          city: 'Canoas',
          complement: 'Bloco 1 - Apartamento 502',
          country: 'Brasil',
          district: 'Igara',
          number: '1030',
          postal_code: '92412216',
          state: 'Rio Grande do Sul',
          street: 'Rua Henrique Stefani',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('addresses', null, {});
  },
};
