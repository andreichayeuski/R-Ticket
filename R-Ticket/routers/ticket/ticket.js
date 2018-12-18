const express = require('express');
const router = express.Router();
const createTicket = require('./createTicket');
const takeTicket = require('./takeTicket');
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false});

router.use(bodyParser.json());

router.use('/create', createTicket);
router.use('/take', takeTicket);

router.get('/', (req, res) => {
	console.log(req.originalUrl);
	let date = new Date();
	date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
	let ticket = [];
	req.db.sequelize.query('GetTicket')
		.then((result) => {
			console.log(result[0]);
			ticket = result[0];
			res.render('index',
				{
					layout: 'ticket/ticket',
					tickets: ticket,
					date: date
				});
		})
		.error((err) => {
			console.log(err);
		});
});

router.post('/', urlencodedParser, (req, res) => {
	console.log(req.body);
	let sheduleRoutes = [];
	req.db.sequelize.query('ShowSheduleRoutesOnDate :date', {
		replacements:
			{
				date: req.body.date
			}
	})
		.then((result) => {
			console.log(result[0]);
			sheduleRoutes = result[0];
			console.log(sheduleRoutes);
			if (req.body.sheduleRoute !== undefined)
			{
				console.log('not undefined');
				req.db.sequelize.query('GetCarSheduleByRoutes :sheduleRoute',
					{
						replacements:
							{
								sheduleRoute: parseInt(req.body.sheduleRoute)
							}
					})
					.then((result) => {
						let carShedule = result[0];
						console.log(result[0]);
						req.db.sequelize.query('ShowSheduleRoutesByPk :sheduleRoutesId',
							{
								replacements:
									{
										sheduleRoutesId: parseInt(req.body.sheduleRoute)
									}
							})
							.then((result) => {
								console.log(result[0]);
								res.render('index',
									{
										layout: 'ticket/ticket',
										sheduleRoutes: sheduleRoutes,
										date: req.body.date,
										carShedules: carShedule,
										sheduleRouteSelected: result[0][0]
									});
							})
							.error((err) => {
								console.log(err);
							});
					})
					.error((err) => {
						console.log(err);
					});
			}
			else
			{
				res.render('index',
					{
						layout: 'ticket/ticket',
						sheduleRoutes: sheduleRoutes,
						date: req.body.date,
						space: []
					});
			}
		})
		.error((err) => {
			console.log(err);
		});
});

router.post('/get', urlencodedParser, (req, res) => {
	console.log(req.originalUrl);
	let ticket = [];
	req.db.sequelize.query('GetAvaivableTicketsInCar :carSheduleId',
		{
			replacements:{
				carSheduleId: parseInt(req.body.carSheduleId)
			}
		})
		.then((result) => {
			ticket = result[0];
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify({
				"tickets": ticket
			}));
		})
		.error((err) => {
			console.log(err);
		});
});

module.exports = router;