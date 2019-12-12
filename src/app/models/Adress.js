import Sequelize, { Model } from 'sequelize';

class Adress extends Model {
  static init(sequelize) {
    super.init(
      {
        city: Sequelize.STRING,
        complement: Sequelize.STRING,
        country: Sequelize.STRING,
        district: Sequelize.STRING,
        number: Sequelize.INTEGER,
        postal_code: Sequelize.INTEGER,
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

export default Adress;
