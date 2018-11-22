'use strict';

module.exports = {
	up: (queryInterface, Sequelize) =>
	{
		return queryInterface.addColumn(
			'WeekDay',
			'Code',
			{
				type: Sequelize.STRING(2),
                unique: true,
                allowNull: false
			}
		);
	},

	down: (queryInterface, Sequelize) =>
	{
		return queryInterface.removeColumn(
			'films',
			'genres'
		);
	}
};