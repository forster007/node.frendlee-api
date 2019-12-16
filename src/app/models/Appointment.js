import Sequelize, { Model } from 'sequelize';

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        description: Sequelize.STRING,
        provider_id: Sequelize.INTEGER,
        customer_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Customer, { as: 'customer' });
  }
}

export default Appointment;
