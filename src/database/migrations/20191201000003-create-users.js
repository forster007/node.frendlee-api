module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },

      email: { allowNull: false, type: Sequelize.STRING, unique: true },
      password_hash: { allowNull: false, type: Sequelize.STRING },
      status: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['disabled', 'enabled', 'locked'],
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('users');
  },
};
