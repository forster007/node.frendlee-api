module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('providers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },

      birthdate: { allowNull: false, type: Sequelize.DATE },
      formation: { allowNull: true, type: Sequelize.STRING },
      gender: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['female', 'male'],
      },
      gps: { allowNull: true, type: Sequelize.STRING },
      have_allergy: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      have_diseases: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      have_treatment: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      is_medical_provider: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      lastname: { allowNull: false, type: Sequelize.STRING },
      name: { allowNull: false, type: Sequelize.STRING },
      onesignal: { allowNull: true, type: Sequelize.STRING },
      phone_number: { allowNull: true, type: Sequelize.STRING, unique: true },
      phone_number_is_whatsapp: {
        allowNull: false,
        default: false,
        type: Sequelize.BOOLEAN,
      },
      picture_address: { allowNull: true, type: Sequelize.BLOB('tiny') },
      picture_certification: { allowNull: true, type: Sequelize.BLOB('tiny') },
      picture_profile: { allowNull: true, type: Sequelize.BLOB('tiny') },
      picture_license: { allowNull: true, type: Sequelize.BLOB('tiny') },
      ssn: { allowNull: true, type: Sequelize.STRING, unique: true },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('providers');
  },
};
