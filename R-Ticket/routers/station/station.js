const express = require('express');
const router = express.Router();
const createStation = require('./createStation');
const Handlebars = require('handlebars');

Handlebars.registerHelper('isStation', (IsStation) =>
{
	let text = '';
	if (IsStation == 1)
	{
		text = Handlebars.escapeExpression('Станция');
	}
	else
	{
		text = Handlebars.escapeExpression('Остановочный пункт');
	}
	return new Handlebars.SafeString(
		text
	);
});
router.use('/create', createStation);

router.get('/', (req, res) => {
	console.log(req.originalUrl);
	let stations = [];
	req.db.sequelize.query('GetStation')
		.then((result) => {
			console.log(result[0]);
			stations = result[0];
			res.render('index',
				{
					layout: 'station/station',
					stations: stations
				});
		})
		.error((err) => {
			console.log(err);
			res.redirect('http://r-ticket.chav:6608');
		});
});

router.get('/:id', (req, res) =>
{
	console.log(req.params);
	req.db.sequelize.query('GetOneStation :id',
		{
			replacements: {
				id: parseInt(req.params.id)
			}
		})
		.then((result) => {
			console.log(result[0]);
			stations = result[0];
			res.render('index',
				{
					layout: 'station/station',
					stations: stations
				});
		})
		.error((err) => {
			console.log(err);
			res.redirect('http://r-ticket.chav:6608');
		});
});

module.exports = router;