import Sequelize, { Model } from 'sequelize';

class ProviderServices extends Model {
  static init(sequelize) {
    super.init(
      {
        provider_id: Sequelize.INTEGER,
        service_id: Sequelize.INTEGER,
        value: Sequelize.DOUBLE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Service, { as: 'service', foreignKey: 'id' });
  }
}

export default ProviderServices;
