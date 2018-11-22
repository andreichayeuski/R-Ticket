module.exports = (sequelize, connection) =>{
	return connection.define('TrainType', {
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
			}
	});
};