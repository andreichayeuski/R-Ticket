const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false});

router.use(bodyParser.json());

router.get('/', (req, res) => {
	console.log(req.originalUrl);
	req.db.sequelize.query('GetStation')
		.then((result) => {
			console.log(result[0]);
			stations = result[0];
			res.render('index',
				{
					layout: 'station/create',
					stations: stations
				});
		})
		.error((err) => {
			console.log(err);
			res.redirect('http://r-ticket.chav:6608');
		});
});

router.post('/', urlencodedParser, (req, res) => {
	console.log(req.body);
	req.db.sequelize.query('AddStation :name, :description, :latitude, :longitude, :isStation', {
		replacements:
			{
				name: req.body.name,
				description: req.body.description,
				latitude: parseFloat(req.body.latitude),
				longitude: parseFloat(req.body.longitude),
				isStation: parseInt(req.body.isStation)
			}
	})
		.then((result) => {
			console.log(result[0][0]);
			if (result[0][0].result === 1)
			{
				res.redirect('http://r-ticket.chav:6608/station/create');
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