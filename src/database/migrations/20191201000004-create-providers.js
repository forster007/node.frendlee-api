module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('providers', {
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      formation: { allowNull: true, type: Sequelize.STRING },
      is_medical_provider: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      picture_certification: { allowNull: true, type: Sequelize.BLOB('tiny') },
      picture_license: { allowNull: true, type: Sequelize.BLOB('tiny') },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('providers');
  },
};
