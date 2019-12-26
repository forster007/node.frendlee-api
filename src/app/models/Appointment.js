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
        value: Sequelize.DOUBLE,
        address_id: Sequelize.INTEGER,
        customer_id: Sequelize.INTEGER,
        provider_id: Sequelize.INTEGER,
        provider_service_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Address, {
      as: 'address',
      foreignKey: 'address_id',
    });

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
