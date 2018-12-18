const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false});

router.use(bodyParser.json());

router.get('/', (req, res) => {
	console.log(req.originalUrl);
	let date = new Date();
	date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
	getInfo(date, req, res);
});

router.post('/', urlencodedParser, (req, res) => {
	console.log(req.body);
	getInfo(req.body.date, req, res);
});

async function getInfo(date, req, res)
{
	let carShedule = [];
	req.db.sequelize.query('GetCarOnShedule :date',
		{
			replacements:
				{
					date: date
				}
		})
		.then((result) => {
			console.log(result[0]);
			carShedule = result[0];
			res.render('index',
				{
					layout: 'space/create',
					carShedules: carShedule,
					date: date
				});
		})
		.error((err) => {
			console.log(err);
			res.redirect('http://r-ticket.chav:6608');
		});
}

router.post('/new', urlencodedParser, (req, res) => {
	console.log(req.originalUrl);
	console.log(req.body);
	req.db.sequelize.query('AddSpace :carSheduleId', {
		replacements:
			{
				carSheduleId: parseInt(req.body.carSheduleId)
			}
	})
		.then((result) => {
			console.log(result[0]);
			res.redirect('http://r-ticket.chav:6608/space/create');
		})
		.error((err) => {
			console.log(err);
			res.redirect('http://r-ticket.chav:6608');
		});
});

module.exports = router;