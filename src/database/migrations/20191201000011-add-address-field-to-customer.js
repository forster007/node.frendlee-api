module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('customers', 'address_id', {
      allowNull: false,
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      references: { model: 'addresses', key: 'id' },
      type: Sequelize.INTEGER,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('customers', 'address_id');
  },
};
