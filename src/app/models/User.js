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
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
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
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  static associate(models) {
    this.belongsTo(models.Administrator, {
      as: 'administrator',
      foreignKey: 'id',
    });

    this.belongsTo(models.Customer, {
      as: 'customer',
      foreignKey: 'id',
    });

    this.belongsTo(models.Provider, {
      as: 'provider',
      foreignKey: 'id',
    });
  }
}

export default User;
