module.exports = (Sequelize, sequelize) => {
	return sequelize.define('CarShedule', {
		CarId: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		SheduleRoutesId: {
			type: Sequelize.INTEGER,
			allowNull: false
		}
	});
};