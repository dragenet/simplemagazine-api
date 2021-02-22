'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('RefreshTokens', 'expiresIn', {
      type: Sequelize.DATE,
      allowNull: false,
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('RefreshTokens', 'expiresIn')
  },
}
