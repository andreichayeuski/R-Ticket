module.exports = (sequelize, connection) =>{
	return connection.define('DaysOfRunning', {
		ID:
			{
				type: sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
		TrainId:
			{
				type: sequelize.INTEGER,
				allowNull: false
			},
		WeekDayId:
			{
				type: sequelize.INTEGER,
				allowNull: true
			},
		Even:
			{
				type: sequelize.BLOB(1),
				allowNull: true
			}
	});
};