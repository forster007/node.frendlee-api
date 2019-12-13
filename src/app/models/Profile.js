import { Model } from 'sequelize';

class Profile extends Model {
  static init(sequelize) {
    super.init({}, { sequelize });

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
  }
}

export default Profile;
