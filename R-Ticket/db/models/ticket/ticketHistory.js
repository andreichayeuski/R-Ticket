module.exports = (sequelize, connection) =>{
	return connection.define('TicketHistory', {
		ID:
			{
				type: sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
		TicketId:
			{
				type: sequelize.INTEGER,
				allowNull: false
			},
		SellDate:
			{
				type: sequelize.DATE,
				allowNull: false,
			},
		ReturnDate:
			{
				type: sequelize.DATE,
				allowNull: true,
			}
	});
};