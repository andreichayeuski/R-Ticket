module.exports = (sequelize, connection) =>{
	return connection.define('PlaceType', {
		ID:
			{
				type: sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
		Name:
			{
				type: sequelize.STRING(30),
				allowNull: false
			},
		Code:
			{
				type: sequelize.STRING(2),
				allowNull: false
			}
	});
};