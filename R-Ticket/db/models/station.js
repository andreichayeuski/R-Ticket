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
				type: sequelize.STRING,
				allowNull: true
			},
		latitude: {
			type: sequelize.DOUBLE
		},
		longitude: {
			type: sequelize.DOUBLE
		},
	});
};