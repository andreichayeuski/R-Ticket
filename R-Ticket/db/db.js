const TrainType = require('./models/train/trainType');
const Train = require('./models/train/train');
const Station = require('./models/station');
const Routes = require('./models/routes');
const WeekDay = require('./models/shedule/weekDay');
const Shedule = require('./models/shedule/shedule');
const SheduleRoutes = require('./models/shedule/sheduleRoutes');
const DaysOfRunning = require('./models/shedule/daysOfRunning');
const PlaceType = require('./models/car/placeType');
const SpaceType = require('./models/car/spaceType');
const CarType = require('./models/car/carType');
const Car = require('./models/car/car');
const CarShedule = require('./models/carShedule');
const Space = require('./models/car/space');
const Country = require('./models/country');
const UserDB = require('./models/user/userDB');
const User = require('./models/user/user');
const Price = require('./models/ticket/price');
const Ticket = require('./models/ticket/ticket');
const TicketHistory = require('./models/ticket/ticketHistory');

const config = require('./config.json');

module.exports = (Sequelize, login = config.login, password = config.password, db = config.db) =>
{
	const sequelize = new Sequelize(db, login, password, {
		host: config.host,
		dialect: config.dialect,
		logging: false,
		port: config.port,
		define: {
			timestamps: false,
			paranoid: false,
			freezeTableName: true
		},
		options: {
			instanceName: config.dialectOptions.instanceName
		}
	});

	const trainType = TrainType(Sequelize, sequelize);
	const train = Train(Sequelize, sequelize);
	const station = Station(Sequelize, sequelize);
	const routes = Routes(Sequelize, sequelize);
	const weekDay = WeekDay(Sequelize, sequelize);
	const shedule = Shedule(Sequelize, sequelize);
	const sheduleRoutes= SheduleRoutes(Sequelize, sequelize);
	const daysOfRunning = DaysOfRunning(Sequelize, sequelize);
	const placeType = PlaceType(Sequelize, sequelize);
	const spaceType = SpaceType(Sequelize, sequelize);
	const carType = CarType(Sequelize, sequelize);
	const car = Car(Sequelize, sequelize);
	const carShedule = CarShedule(Sequelize, sequelize);
	const space = Space(Sequelize, sequelize);
	const country = Country(Sequelize, sequelize);
	const userDB = UserDB(Sequelize, sequelize);
	const user = User(Sequelize, sequelize);
	const price = Price(Sequelize, sequelize);
	const ticket = Ticket(Sequelize, sequelize);
	const ticketHistory = TicketHistory(Sequelize, sequelize);

	train.belongsTo(trainType, { foreignKey: 'TypeId' });
	train.belongsTo(station, { foreignKey: 'DepartureStationId' });
	train.belongsTo(station, { foreignKey: 'ArrivalStationId' });
	routes.belongsTo(station, { foreignKey: 'DepartureStationId' });
	routes.belongsTo(station, { foreignKey: 'ArrivalStationId' });
	routes.belongsTo(train, { foreignKey: 'TrainId' });
	daysOfRunning.belongsTo(train, { foreignKey: 'TrainId' });
	daysOfRunning.hasMany(weekDay, { foreignKey: 'WeekDayId' });
	sheduleRoutes.hasMany(shedule, { foreignKey: 'SheduleId' });
	sheduleRoutes.hasMany(routes, { foreignKey: 'RoutesId' });
	car.hasMany(carType, {foreignKey: 'CarTypeId' });
	car.belongsTo(carType, {foreignKey: 'PlacesTypeId' });
	car.belongsToMany(sheduleRoutes, {as: 'sheduleRoutes', through: 'CarShedule'});
	sheduleRoutes.belongsToMany(car, {as: 'car', through: 'CarShedule'});
	space.belongsTo(car, { foreignKey: 'CarId' });
	space.belongsTo(spaceType, { foreignKey: 'SpacesTypeId' });
	user.belongsTo(country, { foreignKey: 'CountryId' });
	ticket.belongsTo(price, { foreignKey: 'PriceId' });
	ticket.belongsTo(space, { foreignKey: 'SpaceId' });
	ticket.belongsTo(user, { foreignKey: 'UserId' });
	ticketHistory.belongsTo(ticket, { foreignKey: 'TicketId' });

	return {
		trainType,
		train,
		station,
		routes,
		weekDay,
		shedule,
		sheduleRoutes,
		daysOfRunning,
		placeType,
		spaceType,
		carType,
		carShedule,
		space,
		country,
		userDB,
		user,
		price,
		ticket,
		ticketHistory,

		sequelize: sequelize,
		Sequelize: Sequelize
	};
};