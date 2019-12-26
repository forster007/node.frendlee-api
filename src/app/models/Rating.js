import Sequelize, { Model } from 'sequelize';

class Rating extends Model {
  static init(sequelize) {
    super.init(
      {
        appointment_id: Sequelize.INTEGER,
        customer_id: Sequelize.INTEGER,
        customer_rating: Sequelize.INTEGER,
        provider_id: Sequelize.INTEGER,
        provider_rating: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Rating;
