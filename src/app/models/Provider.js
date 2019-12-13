import Sequelize, { Model } from 'sequelize';

class Provider extends Model {
  static init(sequelize) {
    super.init(
      {
        birthdate: Sequelize.DATE,
        gender: {
          type: Sequelize.ENUM,
          values: ['female', 'male'],
        },
        formation: Sequelize.STRING,
        gps: Sequelize.STRING,
        is_medical_provider: Sequelize.BOOLEAN,
        lastname: Sequelize.STRING,
        name: Sequelize.STRING,
        onesignal: Sequelize.STRING,
        phone_number: Sequelize.INTEGER,
        phone_number_is_whatsapp: Sequelize.BOOLEAN,
        picture_address: Sequelize.BLOB('tiny'),
        picture_certification: Sequelize.BLOB('tiny'),
        picture_license: Sequelize.BLOB('tiny'),
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
    this.belongsTo(models.Address, {
      as: 'user_address',
      foreignKey: 'address_id',
    });

    this.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_id',
    });
  }
}

export default Provider;
