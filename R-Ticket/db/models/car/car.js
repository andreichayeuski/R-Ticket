module.exports = (sequelize, connection) =>{
	return connection.define('Car', {
		ID:
			{
				type: sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
		CarTypeId:
			{
				type: sequelize.INTEGER,
				allowNull: false,
			},
		PlaceTypeId:
			{
				type: sequelize.INTEGER,
				allowNull: false,
			}
	});
};