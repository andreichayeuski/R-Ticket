module.exports = (sequelize, connection) =>{
	return connection.define('Shedule', {
		ID:
			{
				type: sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
		Date:
			{
				type: sequelize.DATEONLY,
				allowNull: false,
				unique: true
			}
	});
};