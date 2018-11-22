module.exports = (sequelize, connection) =>{
	return connection.define('CarType', {
		ID:
			{
				type: sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
		Code:
			{
				type: sequelize.STRING(5),
				allowNull: false
			},
		Description:
			{
				type: sequelize.TEXT,
				allowNull: false
			}
	});
};