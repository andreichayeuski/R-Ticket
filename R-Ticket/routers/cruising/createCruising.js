const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false});

router.use(bodyParser.json());

router.get('/', (req, res) => {
	console.log(req.originalUrl);
	let weekDays = [];
	req.db.sequelize.query('GetWeekDay')
		.then((result) => {
			console.log(result[0]);
			weekDays = result[0];
			req.db.sequelize.query('GetTrain')
				.then((result) => {
					console.log(result[0]);
					res.render('index',
						{
							layout: 'cruising/create',
							trains: result[0],
							weekDays: weekDays
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

	if (req.body.isEven === undefined)
	{
		req.body.isEven = 2
	}
	console.log(req.body);
	req.db.sequelize.query('AddCruising :trainId, :isDaily, :isEven', {
		replacements:
			{
				trainId: parseInt(req.body.trainId),
				isDaily: parseInt(req.body.isDaily),
				isEven: parseInt(req.body.isEven)
			}
	})
		.then((result) => {
			console.log(result);
			console.log(result[0][0]);
			if (result[0][0].result === 1)
			{
				if (req.body.weekDays !== undefined)
				{
					console.log(req.body.weekDays);
					Array.from(req.body.weekDays).forEach((weekDay) =>
					{
						weekDay = parseInt(weekDay);
						console.log(weekDay);
						req.db.sequelize.query('AddWeekDayCruising :trainId, :weekDayId',
							{
								replacements:
									{
										trainId: parseInt(req.body.trainId),
										weekDayId: weekDay
									}
							});
					}
					);
					res.redirect('http://r-ticket.chav:6608/cruising/create');
				}
				else
				{
					res.redirect('http://r-ticket.chav:6608/cruising/create');
				}
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