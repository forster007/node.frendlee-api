module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('providers', 'address_id', {
      allowNull: false,
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      references: { model: 'addresses', key: 'id' },
      type: Sequelize.INTEGER,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('providers', 'address_id');
  },
};
