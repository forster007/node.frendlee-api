module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('customers', {
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      blood_pressure: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['low', 'medium', 'high'],
      },
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
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('customers');
  },
};
