module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'customer_id', {
      allowNull: true,
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      references: { model: 'customers', key: 'id' },
      type: Sequelize.INTEGER,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'customer_id');
  },
};
