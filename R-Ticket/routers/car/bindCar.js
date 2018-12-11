const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../../db/db')(require('sequelize'));

var urlencodedParser = bodyParser.urlencoded({extended: false});

router.use(bodyParser.json());

router.get('/', (req, res) => {
	console.log(req.originalUrl);
	let date = new Date();
	date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
	getInfo(date, res);
});

router.post('/', urlencodedParser, (req, res) => {
	console.log(req.body);
	getInfo(req.body.date, res);
});

async function getInfo(date, res)
{
	let cars = [], carShedule = [];
	db.sequelize.query('GetCarOnShedule :date',
		{
			replacements:
				{
					date: date
				}
		})
		.then((result) => {
			console.log(result[0]);
			carShedule = result[0];
			db.sequelize.query('GetCar')
				.then((result) => {
					console.log(result[0]);
					cars = result[0];
					console.log(cars);
					db.sequelize.query('GetCarType')
						.then((result) => {
							console.log(result[0]);
							let carTypes = result[0];
							db.sequelize.query('ShowSheduleRoutesOnDate :date',
								{
									replacements:
										{
											date: date
										}
								})
								.then((result) => {
									console.log(result[0]);
									let sheduleRoutes = result[0];
									res.render('index',
										{
											layout: 'car/bind',
											cars: cars,
											carTypes: carTypes,
											sheduleRoutes: sheduleRoutes,
											carShedules: carShedule,
											date: date
										});
								})
								.error((err) => {
									console.log(err);
								});
						})
						.error((err) => {
							console.log(err);
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

router.post('/new', urlencodedParser, (req, res) => {
	console.log(req.originalUrl);
	console.log(req.body);
	db.sequelize.query('AddCarShedule :number, :carId, :carTypeId, :sheduleRoutesId', {
		replacements:
			{
				number: req.body.number,
				carId: req.body.carId,
				carTypeId: req.body.carTypeId,
				sheduleRoutesId: req.body.sheduleRoutesId
			}
	})
		.then((result) => {
			console.log(result[0]);
			if (result[0][0].result === 1)
			{
				res.redirect('http://r-ticket.chav:6608/car/bind');
			}
			else
			{

			}
		})
		.error((err) => {
			console.log(err);
		});
});

module.exports = router;