module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('profiles', {
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('profiles');
  },
};
