module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('periods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      enabled: {
        allowNull: false,
        defaultValue: true,
        type: Sequelize.BOOLEAN,
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
    return queryInterface.dropTable('periods');
  },
};
