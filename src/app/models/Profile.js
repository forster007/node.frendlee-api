import Sequelize, { Model } from 'sequelize';

class Profile extends Model {
  static init(sequelize) {
    super.init(
      {
        type: {
          type: Sequelize.ENUM,
          values: ['administrator', 'customer', 'provider'],
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Profile;
