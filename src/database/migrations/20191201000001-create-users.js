module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      account_type: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['administrator', 'customer', 'provider'],
      },
      birthdate: { allowNull: false, type: Sequelize.DATE },
      email: { allowNull: false, type: Sequelize.STRING, unique: true },
      gender: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['female', 'male'],
      },
      gps: { allowNull: true, type: Sequelize.STRING },
      lastname: { allowNull: false, type: Sequelize.STRING },
      name: { allowNull: false, type: Sequelize.STRING },
      onesignal: { allowNull: true, type: Sequelize.STRING },
      password_hash: { allowNull: false, type: Sequelize.STRING },
      phone_number: { allowNull: false, type: Sequelize.STRING, unique: true },
      phone_number_is_whatsapp: {
        allowNull: false,
        default: false,
        type: Sequelize.BOOLEAN,
      },
      picture_address: { allowNull: true, type: Sequelize.BLOB('tiny') },
      picture_profile: { allowNull: true, type: Sequelize.BLOB('tiny') },
      ssn: { allowNull: false, type: Sequelize.STRING, unique: true },
      status: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['disabled', 'enabled', 'locked'],
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('users');
  },
};
