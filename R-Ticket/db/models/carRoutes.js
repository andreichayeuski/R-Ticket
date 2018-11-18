module.exports = (Sequelize, sequelize) => {
	return sequelize.define('carRoutes', {
		CarId: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		RoutesId: {
			type: Sequelize.INTEGER,
			allowNull: false
		}
	});
};