module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('profiles', 'customer_id', {
      allowNull: true,
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      references: { model: 'customers', key: 'id' },
      type: Sequelize.INTEGER,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('profiles', 'customer_id');
  },
};
