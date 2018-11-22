module.exports = (sequelize, connection) =>{
	return connection.define('Country', {
		ID:
			{
				type: sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
		Name:
			{
				type: sequelize.STRING,
				allowNull: false,
			},
		Description:
			{
				type: sequelize.TEXT,
				allowNull: true,
			}
	});
};