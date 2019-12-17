import Sequelize, { Model } from 'sequelize';

class Period extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        state: {
          type: Sequelize.VIRTUAL,
          get() {
            return false;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Provider, {
      as: 'providers',
      foreignKey: 'period_id',
      through: 'provider_periods',
    });
  }
}

export default Period;
