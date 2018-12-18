const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false});

router.use(bodyParser.json());

router.get('/', (req, res) => {
	console.log(req.originalUrl);
	let space = [];
	let date = new Date();
	date = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
	req.db.sequelize.query('GetSpace')
		.then((result) => {
			console.log(result[0]);
			space = result[0];
			console.log(space);
			req.db.sequelize.query('GetUser')
				.then((result) => {
					console.log(result[0]);
					res.render('index',
						{
							layout: 'ticket/create',
							spaces: space,
							cars: [],
							date: date
						});
				})
				.error((err) => {
					console.log(err);
					res.redirect('http://r-ticket.chav:6608');
				});
		})
		.error((err) => {
			console.log(err);
			res.redirect('http://r-ticket.chav:6608');
		});
});

router.post('/', urlencodedParser, (req, res) => {
	console.log(req.body);
	let flag = !(req.body.price === ''
		|| req.body.date === ''
		|| req.body.carId === ''
		|| req.body.sheduleRoute === '');
	if (flag)
	{
		console.log("create new tickets");
		req.body.price = Math.round(parseFloat(req.body.price) * 100) / 100;
		console.log(req.body);
		req.db.sequelize.query('AddMoreTickets :price, :carId, :sheduleRoute', {
			replacements:
				{
					price: req.body.price,
					carId: parseInt(req.body.carId),
					sheduleRoute: parseInt(req.body.sheduleRoute)
				}
		})
			.then((result) => {
				console.log(result[0]);
				res.redirect('http://r-ticket.chav:6608/ticket/create');
			})
			.error((err) => {
				console.log(err);
				res.redirect('http://r-ticket.chav:6608');
			});
	}
	else
	{
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
											layout: 'ticket/create',
											sheduleRoutes: sheduleRoutes,
											date: req.body.date,
											carShedules: carShedule,
											sheduleRouteSelected: result[0][0]
										});
								})
								.error((err) => {
									console.log(err);
									res.redirect('http://r-ticket.chav:6608');
								});
						})
						.error((err) => {
							console.log(err);
							res.redirect('http://r-ticket.chav:6608');
						});
				}
				else
				{
					res.render('index',
						{
							layout: 'ticket/create',
							sheduleRoutes: sheduleRoutes,
							date: req.body.date,
							cars: []
						});
				}
			})
			.error((err) => {
				console.log(err);
				res.redirect('http://r-ticket.chav:6608');
			});
	}
});

module.exports = router;