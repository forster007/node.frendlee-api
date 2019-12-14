import Sequelize, { Model } from 'sequelize';

class UserServices extends Model {
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
}

export default UserServices;
