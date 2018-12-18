const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false});

router.use(bodyParser.json());

router.get('/', (req, res) => {
	console.log(req.originalUrl);
	let trains = [];
	req.db.sequelize.query('GetTrain')
		.then((result) => {
			console.log(result[0]);
			trains = result[0];
			res.render('index',
				{
					layout: 'report/report',
					trains: trains
				});
		})
		.error((err) => {
			console.log(err);
			res.redirect('http://r-ticket.chav:6608');
		});
});

router.post('/day', urlencodedParser, (req, res) => {
	console.log(req.originalUrl);
	req.db.sequelize.query('GetReportByDay :day',
		{
			replacements:
				{
					day: req.body.date
				}
		})
		.then((result) => {
			console.log(result[0]);
			price = result[0][0];
			if (price.result == null)
			{
				price.result = 0;
			}
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify({
				"price": price
			}));
		})
		.error((err) => {
			console.log(err);
			res.redirect('http://r-ticket.chav:6608');
		});
});

router.post('/interval', urlencodedParser, (req, res) => {
	console.log(req.originalUrl);
	req.db.sequelize.query('GetReportByPeriod :dateStart, :dateEnd',
		{
			replacements:
				{
					dateStart: req.body.dateStart,
					dateEnd: req.body.dateEnd
				}
		})
		.then((result) => {
			console.log(result[0]);
			price = result[0][0];
			if (price.result == null)
			{
				price.result = 0;
			}
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify({
				"price": price
			}));
		})
		.error((err) => {
			console.log(err);
			res.redirect('http://r-ticket.chav:6608');
		});
});

router.post('/train', urlencodedParser, (req, res) => {
	console.log(req.originalUrl);
	req.db.sequelize.query('GetReportByTrain :trainId',
		{
			replacements:
				{
					trainId: parseInt(req.body.train)
				}
		})
		.then((result) => {
			console.log(result[0]);
			price = result[0][0];
			if (price.result == null)
			{
				price.result = 0;
			}
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify({
				"price": price
			}));
		})
		.error((err) => {
			console.log(err);
			res.redirect('http://r-ticket.chav:6608');
		});
});

module.exports = router;