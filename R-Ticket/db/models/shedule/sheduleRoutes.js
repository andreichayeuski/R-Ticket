module.exports = (Sequelize, sequelize) => {
	return sequelize.define('SheduleRoutes', {
		Id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		RoutesId: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		SheduleId: {
			type: Sequelize.INTEGER,
			allowNull: false
		}
	});
};