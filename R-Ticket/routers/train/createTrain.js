const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false});

router.use(bodyParser.json());

router.get('/', (req, res) => {
	console.log(req.originalUrl);
	let types = [],	stations = [];
	req.db.sequelize.query('GetTrainType')
		.then((result) => {
			console.log(result[0]);
			types = result[0];
			req.db.sequelize.query('GetStation')
				.then((result) => {
					console.log(result[0]);
					stations = result[0];
					console.log(types);
					console.log(stations);
					res.render('index',
						{
							layout: 'train/create',
							types: types,
							stations: stations
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
	req.db.sequelize.query('AddTrain :typeId, :number, :departureStationId, :arrivalStationId', {
		replacements:
			{
				typeId: req.body.trainType,
				number: req.body.number,
				departureStationId: parseInt(req.body.departureStationId),
				arrivalStationId: parseInt(req.body.arrivalStationId)
			}
	})
		.then((result) => {
			console.log(result[0][0]);
			if (result[0][0].result === 1)
			{
				res.redirect('http://r-ticket.chav:6608/train/create');
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