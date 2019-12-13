import Sequelize, { Model } from 'sequelize';

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        city: Sequelize.STRING,
        complement: Sequelize.STRING,
        country: Sequelize.STRING,
        district: Sequelize.STRING,
        number: Sequelize.INTEGER,
        postal_code: Sequelize.STRING,
        state: Sequelize.STRING,
        street: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Address;
