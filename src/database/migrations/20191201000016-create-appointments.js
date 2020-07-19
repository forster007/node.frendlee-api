module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('appointments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      start_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      duration: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      finish_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      observation: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      status: {
        allowNull: false,
        defaultValue: 'opened',
        type: Sequelize.ENUM,
        values: ['waiting', 'paused', 'started', 'opened', 'confirmed', 'payed', 'finished', 'canceled'],
      },
      value: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING,
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
        defaultValue: false,
        type: Sequelize.BOOLEAN,
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
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      provider_service_id: {
        allowNull: false,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        references: {
          key: 'id',
          model: 'provider_services',
        },
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      payed_at: {
        type: Sequelize.DATE,
      },
      started_at: {
        type: Sequelize.DATE,
      },
      finished_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('appointments');
  },
};
