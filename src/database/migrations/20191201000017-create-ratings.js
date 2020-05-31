module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ratings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      appointment_id: {
        allowNull: false,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        references: {
          key: 'id',
          model: 'appointments',
        },
        type: Sequelize.INTEGER,
      },
      customer_comment: Sequelize.STRING,
      customer_compliment: {
        type: Sequelize.ENUM,
        values: ['nice', 'organized', 'professional', 'informed', 'effective', 'mannerly'],
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
      customer_rating: {
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      provider_comment: Sequelize.STRING,
      provider_compliment: {
        type: Sequelize.ENUM,
        values: ['nice', 'organized', 'professional', 'informed', 'effective', 'mannerly'],
      },
      provider_id: {
        allowNull: false,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        references: {
          key: 'id',
          model: 'providers',
        },
        type: Sequelize.INTEGER,
      },
      provider_rating: {
        defaultValue: 0,
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable('ratings');
  },
};
