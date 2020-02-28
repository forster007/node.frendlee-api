module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'addresses',
      [
        {
          city: 'Canoas',
          complement: 'Bloco 1 Apartamento 502',
          country: 'Brasil',
          district: 'Igara',
          number: '1030',
          postal_code: '92412216',
          state: 'RS',
          street: 'Rua Henrique Stefani',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          city: 'Canoas',
          complement: null,
          country: 'Brasil',
          district: 'Igara',
          number: '75',
          postal_code: '92410330',
          state: 'RS',
          street: 'Rua Apá',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          city: 'Canoas',
          complement: null,
          country: 'Brasil',
          district: 'Estância Velha',
          number: '480',
          postal_code: '92032440',
          state: 'RS',
          street: 'Rua São Nicoau',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          city: 'Canoas',
          complement: null,
          country: 'Brasil',
          district: 'Porto Belo',
          number: '147',
          postal_code: '92325440',
          state: 'RS',
          street: 'Rua Coronel Medeiros',
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
