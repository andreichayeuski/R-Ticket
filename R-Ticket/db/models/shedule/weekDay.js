module.exports = (sequelize, connection) =>{
	return connection.define('WeekDay', {
		ID:
			{
				type: sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
		Name:
			{
				type: sequelize.STRING(12),
				allowNull: false,
				unique: true
			}
	});
};