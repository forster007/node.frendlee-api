import Sequelize, { Model } from 'sequelize';

class Customer extends Model {
  static init(sequelize) {
    super.init(
      {
        birthdate: Sequelize.DATE,
        blood_pressure: {
          type: Sequelize.ENUM,
          values: ['low', 'medium', 'high'],
        },
        gender: {
          type: Sequelize.ENUM,
          values: ['female', 'male'],
        },
        gps: Sequelize.STRING,
        have_allergy: Sequelize.BOOLEAN,
        have_diseases: Sequelize.BOOLEAN,
        have_treatment: Sequelize.BOOLEAN,
        lastname: Sequelize.STRING,
        name: Sequelize.STRING,
        onesignal: Sequelize.STRING,
        phone_number: Sequelize.STRING,
        phone_number_is_whatsapp: Sequelize.BOOLEAN,
        picture_profile: Sequelize.STRING,
        picture_profile_url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/files/${this.picture_profile}`;
          },
        },
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
      as: 'address',
      foreignKey: 'address_id',
    });

    this.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_id',
    });
  }
}

export default Customer;
