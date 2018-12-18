const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false});

router.use(bodyParser.json());

router.get('/', (req, res) => {
	console.log(req.originalUrl);
	let cars = [];
	req.db.sequelize.query('GetCar')
		.then((result) => {
			console.log(result[0]);
			cars = result[0];
			console.log(cars);
			req.db.sequelize.query('GetPlaceType')
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
	req.db.sequelize.query('AddCar :serialNumber, :placeTypeId', {
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
				res.redirect('http://r-ticket.chav:6608');
			}
		})
		.error((err) => {
			console.log(err);
			res.redirect('http://r-ticket.chav:6608');
		});
});

module.exports = router;