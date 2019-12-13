module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'adress_id', {
      allowNull: true,
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      references: { model: 'adresses', key: 'id' },
      type: Sequelize.INTEGER,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'adress_id');
  },
};
