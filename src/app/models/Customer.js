import Sequelize, { Model } from 'sequelize';

class Customer extends Model {
  static init(sequelize) {
    super.init(
      {
        blood_pressure: {
          type: Sequelize.ENUM,
          values: ['low', 'medium', 'high'],
        },
        have_allergy: Sequelize.BOOLEAN,
        have_diseases: Sequelize.BOOLEAN,
        have_treatment: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Customer;
