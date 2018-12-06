const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../../db/db')(require('sequelize'));

var urlencodedParser = bodyParser.urlencoded({extended: false});

router.use(bodyParser.json());

router.get('/', (req, res) => {
	console.log(req.originalUrl);
	let cars = [];
	db.sequelize.query('GetCar')
		.then((result) => {
			console.log(result[0]);
			cars = result[0];
			console.log(cars);
			db.sequelize.query('GetPlaceType')
				.then((result) => {
					console.log(result[0]);
					res.render('index',
						{
							layout: 'car/create',
							cars: cars,
							placeTypes: result[0]
						});
				})
				.error((err) => {
					console.log(err);
				});
		})
		.error((err) => {
			console.log(err);
		});
});

router.post('/', urlencodedParser, (req, res) => {
	console.log(req.body);
	db.sequelize.query('AddCar :serialNumber, :placeTypeId', {
		replacements:
			{
				serialNumber: req.body.number,
				placeTypeId: parseInt(req.body.placeType)
			}
	})
		.then((result) => {
			console.log(result[0][0]);
			if (result[0][0].result === 1)
			{
				res.redirect('http://r-ticket.chav:6608/car/create');
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