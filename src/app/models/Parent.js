import Sequelize, { Model } from 'sequelize';

class Parent extends Model {
  static init(sequelize) {
    super.init(
      {
        avatar: {
          type: Sequelize.VIRTUAL,
          get() {
            return { uri: `${process.env.APP_URL}/files/${this.picture_profile}` };
          },
        },
        birthdate: Sequelize.DATE,
        gender: {
          type: Sequelize.ENUM,
          values: ['female', 'male'],
        },
        lastname: Sequelize.STRING,
        name: Sequelize.STRING,
        onesignal: Sequelize.STRING,
        phone_number: Sequelize.STRING,
        phone_number_is_whatsapp: Sequelize.BOOLEAN,
        picture_profile: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_id',
    });
  }
}

export default Parent;
