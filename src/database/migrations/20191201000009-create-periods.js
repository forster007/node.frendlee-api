module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('periods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },

      name: { allowNull: false, type: Sequelize.STRING },
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('periods');
  },
};
