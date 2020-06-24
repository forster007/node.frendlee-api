module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('customer_parents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      customer_id: {
        allowNull: false,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        references: {
          key: 'id',
          model: 'customers',
        },
        type: Sequelize.INTEGER,
      },
      parent_id: {
        allowNull: false,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        references: {
          key: 'id',
          model: 'parents',
        },
        type: Sequelize.INTEGER,
      },
      customer_nickname: {
        type: Sequelize.STRING,
      },
      parent_nickname: {
        type: Sequelize.STRING,
      },
      status: {
        allowNull: false,
        defaultValue: 'waiting',
        type: Sequelize.ENUM,
        values: ['waiting', 'approved', 'rejected'],
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('customer_parents');
  },
};
