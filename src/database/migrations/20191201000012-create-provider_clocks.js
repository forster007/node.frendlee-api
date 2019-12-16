module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('provider_clocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },

      provider_id: {
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: { model: 'providers', key: 'id' },
        type: Sequelize.INTEGER,
      },
      clock_id: {
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: { model: 'clocks', key: 'id' },
        type: Sequelize.INTEGER,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('provider_clocks');
  },
};
