module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'profile_id', {
      allowNull: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: { model: 'profiles', key: 'id' },
      type: Sequelize.INTEGER,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'profile_id');
  },
};
