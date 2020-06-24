import Sequelize, { Model } from 'sequelize';

class CustomerParent extends Model {
  static init(sequelize) {
    super.init(
      {
        customer_id: Sequelize.INTEGER,
        parent_id: Sequelize.INTEGER,
        customer_nickname: Sequelize.STRING,
        parent_nickname: Sequelize.STRING,
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

    this.belongsTo(models.Parent, {
      as: 'parent',
      foreignKey: 'parent_id',
    });
  }
}

export default CustomerParent;
