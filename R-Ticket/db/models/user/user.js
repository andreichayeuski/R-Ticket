module.exports = (sequelize, connection) =>{
	return connection.define('User', {
		ID:
			{
				type: sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
		FName:
			{
				type: sequelize.STRING(50),
				allowNull: false,
			},
		SName:
			{
				type: sequelize.STRING(50),
				allowNull: false,
			},
		MName:
			{
				type: sequelize.STRING(50),
				allowNull: true,
			},
		Email:
			{
				type: sequelize.STRING(50),
				allowNull: false,
			},
		Birthday:
			{
				type: sequelize.DATEONLY,
				allowNull: false,
			},
		Sex:
			{
				type: sequelize.BLOB(1),
				allowNull: false,
			},
		Passport:
			{
				type: sequelize.STRING(30),
				allowNull: false,
			},
		FNameEn:
			{
				type: sequelize.STRING(50),
				allowNull: false,
			},
		SNameEn:
			{
				type: sequelize.STRING(50),
				allowNull: false,
			},
		Telephone:
			{
				type: sequelize.STRING(20),
				allowNull: true,
			},
		Login:
			{
				type: sequelize.STRING(50),
				allowNull: false,
			},
		Password:
			{
				type: sequelize.STRING(30),
				allowNull: false,
			},
		CountryId:
			{
				type: sequelize.INTEGER,
				allowNull: false,
			},
	});
};