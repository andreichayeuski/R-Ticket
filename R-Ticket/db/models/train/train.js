module.exports = (sequelize, connection) =>{
	return connection.define('Train', {
		ID:
			{
				type: sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
		Number:
			{
				type: sequelize.STRING(5),
				allowNull: false,
				unique: true
			},
		TypeId:
			{
				type: sequelize.INTEGER,
				allowNull: false,
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
			}
	});
};