import Sequelize, { Model } from 'sequelize';

class CustomerToken extends Model {
  static init(sequelize) {
    super.init(
      {
        customer_id: Sequelize.INTEGER,
        token: Sequelize.STRING,
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
  }
}

export default CustomerToken;
