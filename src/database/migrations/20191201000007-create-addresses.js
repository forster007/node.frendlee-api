module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },

      city: { allowNull: false, type: Sequelize.STRING },
      complement: { allowNull: true, type: Sequelize.STRING },
      country: { allowNull: false, type: Sequelize.STRING },
      district: { allowNull: false, type: Sequelize.STRING },
      number: { allowNull: false, type: Sequelize.INTEGER },
      postal_code: { allowNull: false, type: Sequelize.STRING },
      state: { allowNull: false, type: Sequelize.STRING },
      street: { allowNull: false, type: Sequelize.STRING },
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('addresses');
  },
};
