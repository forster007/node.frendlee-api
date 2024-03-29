import Sequelize, { Model } from 'sequelize';

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        start_at: Sequelize.DATE,
        duration: Sequelize.INTEGER,
        finish_at: Sequelize.DATE,
        observation: Sequelize.STRING,
        status: {
          defaultValue: 'opened',
          type: Sequelize.ENUM,
          values: ['paused', 'started', 'opened', 'confirmed', 'payed', 'finished', 'canceled'],
        },
        value: Sequelize.DOUBLE,
        address: Sequelize.STRING,
        customer_id: Sequelize.INTEGER,
        customer_rating: Sequelize.BOOLEAN,
        provider_id: Sequelize.INTEGER,
        provider_rating: Sequelize.BOOLEAN,
        provider_service_id: Sequelize.INTEGER,
        payed_at: Sequelize.DATE,
        started_at: Sequelize.DATE,
        finished_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Customer, {
      as: 'customer',
      foreignKey: 'customer_id',
    });

    this.belongsTo(models.Provider, {
      as: 'provider',
      foreignKey: 'provider_id',
    });

    this.belongsTo(models.ProviderServices, {
      as: 'detail',
      foreignKey: 'provider_service_id',
    });

    this.belongsTo(models.Rating, {
      as: 'rating',
      foreignKey: 'id',
    });
  }
}

export default Appointment;
