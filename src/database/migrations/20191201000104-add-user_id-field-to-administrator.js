module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('administrators', 'user_id', {
      allowNull: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: { model: 'users', key: 'id' },
      type: Sequelize.INTEGER,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('administrators', 'user_id');
  },
};
