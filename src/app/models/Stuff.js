import Sequelize, { Model } from 'sequelize';

class Stuff extends Model {
  static init(sequelize) {
    super.init({ name: Sequelize.STRING }, { sequelize, tableName: 'stuffs' });

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Provider, {
      as: 'providers',
      foreignKey: 'stuff_id',
      through: 'provider_stuffs',
    });
  }
}

export default Stuff;
