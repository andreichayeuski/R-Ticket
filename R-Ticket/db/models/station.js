module.exports = (sequelize, connection) =>{
	return connection.define('station', {
		ID:
			{
				type: sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
		Name:
			{
				type: sequelize.STRING,
				allowNull: false
			},
		Description:
			{
				type: sequelize.TEXT,
				allowNull: true
			},
		Latitude:
			{
				type: sequelize.DOUBLE,
				allowNull: false
			},
		Longitude:
			{
				type: sequelize.DOUBLE,
				allowNull: false
			}
	});
};