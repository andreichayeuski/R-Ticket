module.exports = (sequelize, connection) =>{
	return connection.define('Ticket', {
		ID:
			{
				type: sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
		PriceId:
			{
				type: sequelize.INTEGER,
				allowNull: false
			},
		SpaceId:
			{
				type: sequelize.INTEGER,
				allowNull: false,
			},
		UserId:
			{
				type: sequelize.INTEGER,
				allowNull: true,
			}
	});
};