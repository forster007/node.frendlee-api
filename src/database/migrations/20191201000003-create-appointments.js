module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('appointments', {
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      date: { allowNull: false, type: Sequelize.DATE },
      description: { allowNull: false, type: Sequelize.STRING },
      customer_id: {
        allowNull: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        references: { model: 'users', key: 'id' },
        type: Sequelize.INTEGER,
      },
      provider_id: {
        allowNull: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        references: { model: 'users', key: 'id' },
        type: Sequelize.INTEGER,
      },
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('appointments');
  },
};
