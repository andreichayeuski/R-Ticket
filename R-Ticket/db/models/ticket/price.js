module.exports = (sequelize, connection) =>{
	return connection.define('Price', {
		ID:
			{
				type: sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
		Value:
			{
				type: sequelize.DOUBLE,
				allowNull: false,
			}
	});
};