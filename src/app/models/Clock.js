import Sequelize, { Model } from 'sequelize';

class Clock extends Model {
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
      foreignKey: 'clock_id',
      through: 'provider_clocks',
    });
  }
}

export default Clock;
