module.exports = (sequelize, connection) =>{
	return connection.define('SpaceType', {
		ID:
			{
				type: sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
		Name:
			{
				type: sequelize.STRING(20),
				allowNull: false
			}
	});
};