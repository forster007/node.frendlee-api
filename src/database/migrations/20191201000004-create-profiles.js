module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },

      type: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['administrator', 'customer', 'provider'],
      },
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('profiles');
  },
};
