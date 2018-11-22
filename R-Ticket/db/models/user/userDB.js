module.exports = (sequelize, connection) =>{
	return connection.define('UserDB', {
		ID:
			{
				type: sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
		Name:
			{
				type: sequelize.STRING(30),
				allowNull: false,
			},
		Password:
			{
				type: sequelize.STRING(30),
				allowNull: false,
			}
	});
};