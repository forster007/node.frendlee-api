import bcrypt from 'bcryptjs';
import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        account_type: {
          type: Sequelize.ENUM,
          values: ['administrator', 'customer', 'provider'],
        },
        birthdate: Sequelize.DATE,
        email: Sequelize.STRING,
        gender: {
          type: Sequelize.ENUM,
          values: ['female', 'male'],
        },
        gps: Sequelize.STRING,
        lastname: Sequelize.STRING,
        name: Sequelize.STRING,
        onesignal: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        phone_number: Sequelize.INTEGER,
        phone_number_is_whatsapp: Sequelize.BOOLEAN,
        picture_address: Sequelize.BLOB('tiny'),
        picture_profile: Sequelize.BLOB('tiny'),
        ssn: Sequelize.INTEGER,
        status: {
          type: Sequelize.ENUM,
          values: ['disabled', 'enabled', 'locked'],
        },
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password)
        user.password_hash = await bcrypt.hash(user.password, 8);
    });

    return this;
  }

  static associate(models) {
    this.hasOne(models.Adress, {
      as: 'address',
      foreignKey: 'adress_id',
    });

    this.hasOne(models.Profile, {
      as: 'profile',
      foreignKey: 'profile_id',
    });

    this.belongsToMany(models.Service, {
      as: 'services',
      foreignKey: 'provider_id',
      through: 'users_services',
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
