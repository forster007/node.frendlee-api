import Sequelize, { Model } from 'sequelize';

class Rating extends Model {
  static init(sequelize) {
    super.init(
      {
        appointment_id: Sequelize.INTEGER,
        customer_comment: Sequelize.STRING,
        customer_compliment: {
          defaultValue: 'opened',
          type: Sequelize.ENUM,
          values: ['nice', 'organized', 'professional', 'informed', 'effective', 'mannerly'],
        },
        customer_id: Sequelize.INTEGER,
        customer_rating: Sequelize.INTEGER,
        provider_comment: Sequelize.STRING,
        provider_compliment: {
          defaultValue: 'opened',
          type: Sequelize.ENUM,
          values: ['nice', 'organized', 'professional', 'informed', 'effective', 'mannerly'],
        },
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
