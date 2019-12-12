import Sequelize, { Model } from 'sequelize';

class Service extends Model {
  static init(sequelize) {
    super.init(
      {
        enabled: Sequelize.BOOLEAN,
        max_value: Sequelize.DOUBLE,
        min_value: Sequelize.DOUBLE,
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.User, {
      as: 'users',
      foreignKey: 'service_id',
      through: 'users_services',
    });
  }
}

export default Service;
