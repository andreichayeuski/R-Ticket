module.exports = (sequelize, connection) =>{
	return connection.define('Space', {
		ID:
			{
				type: sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
		CarId:
			{
				type: sequelize.INTEGER,
				allowNull: false,
			},
		SpaceTypeId:
			{
				type: sequelize.INTEGER,
				allowNull: false,
			}
	});
};