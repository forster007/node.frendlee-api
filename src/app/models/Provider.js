import Sequelize, { Model } from 'sequelize';

class Provider extends Model {
  static init(sequelize) {
    super.init(
      {
        formation: Sequelize.STRING,
        is_medical_provider: Sequelize.BOOLEAN,
        picture_certification: Sequelize.BLOB('tiny'),
        picture_license: Sequelize.BLOB('tiny'),
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Provider;
