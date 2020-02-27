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
        phone_number: Sequelize.STRING,
        phone_number_is_whatsapp: Sequelize.BOOLEAN,
        picture_address: Sequelize.STRING,
        picture_address_url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/files/${this.picture_address}`;
          },
        },
        picture_certification: Sequelize.STRING,
        picture_license: Sequelize.STRING,
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

    this.belongsToMany(models.Service, {
      as: 'services',
      foreignKey: 'provider_id',
      through: 'provider_services',
    });

    this.belongsToMany(models.Clock, {
      as: 'clocks',
      foreignKey: 'provider_id',
      through: 'provider_clocks',
    });

    this.belongsToMany(models.Period, {
      as: 'periods',
      foreignKey: 'provider_id',
      through: 'provider_periods',
    });

    this.belongsToMany(models.Stuff, {
      as: 'stuffs',
      foreignKey: 'provider_id',
      through: 'provider_stuffs',
    });

    this.hasMany(models.Rating, {
      as: 'ratings',
    });
  }
}

export default Provider;
