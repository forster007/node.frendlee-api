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
        type: Sequelize.ENUM,
        values: [
          'canceled',
          'confirmed',
          'finished',
          'opened',
          'payed',
          'waiting payment',
          'waiting rating',
          'waiting start',
        ],
      },
      value: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      address_id: {
        allowNull: false,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        references: {
          key: 'id',
          model: 'addresses',
        },
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
