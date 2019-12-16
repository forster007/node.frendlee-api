import Sequelize, { Model } from 'sequelize';

class Administrator extends Model {
  static init(sequelize) {
    super.init(
      {
        birthdate: Sequelize.DATE,
        gender: {
          type: Sequelize.ENUM,
          values: ['female', 'male'],
        },
        lastname: Sequelize.STRING,
        name: Sequelize.STRING,
        phone_number: Sequelize.STRING,
        phone_number_is_whatsapp: Sequelize.BOOLEAN,
        picture_profile: Sequelize.BLOB('tiny'),
        ssn: Sequelize.STRING,
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

export default Administrator;
