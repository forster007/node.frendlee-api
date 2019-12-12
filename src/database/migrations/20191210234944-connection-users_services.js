module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users_services', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      provider_id: {
        allowNull: false,
        onDelete: 'CASCADE',
        references: { model: 'users', key: 'id' },
        type: Sequelize.INTEGER,
      },
      service_id: {
        allowNull: false,
        onDelete: 'CASCADE',
        references: { model: 'services', key: 'id' },
        type: Sequelize.INTEGER,
      },
      value: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('users_services');
  },
};
