module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('services', {
      enabled: {
        allowNull: false,
        defaultValue: true,
        type: Sequelize.BOOLEAN,
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      max_value: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      min_value: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('services');
  },
};
