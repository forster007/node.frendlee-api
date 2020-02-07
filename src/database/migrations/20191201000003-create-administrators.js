module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('administrators', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      birthdate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      gender: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['female', 'male'],
      },
      lastname: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      phone_number: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      phone_number_is_whatsapp: {
        allowNull: false,
        default: false,
        type: Sequelize.BOOLEAN,
      },
      picture_profile: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      ssn: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      user_id: {
        allowNull: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          key: 'id',
          model: 'users',
        },
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('administrators');
  },
};
