module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('services', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },

      enabled: {
        allowNull: false,
        defaultValue: true,
        type: Sequelize.BOOLEAN,
      },
      max_value: { allowNull: false, type: Sequelize.DOUBLE },
      min_value: { allowNull: false, type: Sequelize.DOUBLE },
      name: { allowNull: false, type: Sequelize.STRING },
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('services');
  },
};
