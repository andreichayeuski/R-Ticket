const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../../db/db')(require('sequelize'));

var urlencodedParser = bodyParser.urlencoded({extended: false});

router.use(bodyParser.json());

router.get('/', (req, res) => {
	console.log(req.originalUrl);
	let stations = [];
	db.sequelize.query('GetStation')
		.then((result) => {
			console.log(result[0]);
			stations = result[0];
			console.log(stations);
			res.render('index',
				{
					layout: 'routes/create',
					stations: stations
				});
		})
		.error((err) => {
			console.log(err);
		});
});

router.post('/', urlencodedParser, (req, res) => {
	console.log(req.body);
	db.sequelize.query('AddRoute :depStationId, :arrStationId', {
		replacements:
			{
				depStationId: parseInt(req.body.depStationId),
				arrStationId: parseInt(req.body.arrStationId)
			}
	})
		.then((result) => {
			console.log(result[0][0]);
			if (result[0][0].result === 1)
			{
				res.redirect('http://r-ticket.chav:6608/routes/create');
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