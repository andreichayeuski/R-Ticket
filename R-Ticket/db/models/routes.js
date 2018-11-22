module.exports = (sequelize, connection) =>{
	return connection.define('routes', {
		ID:
			{
				type: sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
		DepartureStationId:
			{
				type: sequelize.INTEGER,
				allowNull: false
			},
		ArrivalStationId:
			{
				type: sequelize.INTEGER,
				allowNull: false
			},
		TrainId:
			{
				type: sequelize.INTEGER,
				allowNull: false
			},
		DepartureTime:
			{
				type: sequelize.TIME,
				allowNull: false
			},
		ArrivalTime:
			{
				type: sequelize.TIME,
				allowNull: false
			}
	});
};