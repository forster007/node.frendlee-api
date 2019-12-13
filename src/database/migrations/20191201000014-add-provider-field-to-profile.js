module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('profiles', 'provider_id', {
      allowNull: true,
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      references: { model: 'providers', key: 'id' },
      type: Sequelize.INTEGER,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('profiles', 'provider_id');
  },
};
