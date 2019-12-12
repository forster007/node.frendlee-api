module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'provider_id', {
      allowNull: true,
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      references: { model: 'providers', key: 'id' },
      type: Sequelize.INTEGER,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'provider_id');
  },
};
