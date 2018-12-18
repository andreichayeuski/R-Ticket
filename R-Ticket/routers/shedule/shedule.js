const express = require('express');
const router = express.Router();
const createShedule = require('./createShedule');
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false});
router.use(bodyParser.json());

router.use('/create', createShedule);

router.get('/', (req, res) => {
	console.log(req.originalUrl);
	let date = new Date();
	date = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
	req.db.sequelize.query('ShowSheduleRoutesOnDate :date', {
		replacements:
			{
				date: date
			}
	})
		.then((result) => {
			console.log(result[0]);
			res.render('index',
				{
					layout: 'shedule/shedule',
					date: date,
					shedules: result[0]
				});
		})
		.error((err) => {
			console.log(err);
			res.redirect('http://r-ticket.chav:6608');
		});
});


router.post('/', urlencodedParser, (req, res) => {
	console.log(req.originalUrl);
	console.log(req.body);
	req.db.sequelize.query('ShowSheduleRoutesOnDate :date', {
		replacements:
			{
				date: req.body.calendar
			}
	})
		.then((result) => {
			console.log(result[0]);
			res.render('index',
				{
					layout: 'shedule/shedule',
					date: req.body.calendar,
					shedules: result[0]
				});
		})
		.error((err) => {
			console.log(err);
			res.redirect('http://r-ticket.chav:6608');
		});
});

module.exports = router;