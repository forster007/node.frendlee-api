import Sequelize, { Model } from 'sequelize';

class Service extends Model {
  static init(sequelize) {
    super.init(
      {
        max_value: Sequelize.DOUBLE,
        min_value: Sequelize.DOUBLE,
        name: Sequelize.STRING,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Provider, {
      as: 'providers',
      foreignKey: 'service_id',
      through: 'provider_services',
    });
  }
}

export default Service;
