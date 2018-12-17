const express = require('express');
const router = express.Router();
const createCruising = require('./createCruising');
const Handlebars = require('handlebars');

Handlebars.registerHelper('isDaily', (isDaily) =>
{
	let text = '';
	if (isDaily == 1)
	{
		text = Handlebars.escapeExpression('ежедневно');
	}
	return new Handlebars.SafeString(
		text
	);
});

Handlebars.registerHelper('isEven', (isEven) =>
{
	let text = '';
	if (isEven === null)
	{

	}
	else if (isEven === true)
	{
		text = Handlebars.escapeExpression('по чётным');
	}
	else
	{
		text = Handlebars.escapeExpression('по нечётным');
	}
	return new Handlebars.SafeString(
		text
	);
});

Handlebars.registerHelper('weekDayHelper', (a, options) =>
{
	let text = '';
	let weekDays = options.data.root.weekDaysArray;
	let cruisingId = options.hash.cruisId;
	console.log(weekDays);
	console.log(cruisingId);
	weekDays.forEach((elem) =>
	{
		if (elem.id === cruisingId)
		{
			text += elem.weekDayCode + ', ';
		}
	});
	return new Handlebars.SafeString(
		text.trimRight(', ')
	);
});

router.use('/create', createCruising);

router.get('/', (req, res) => {
	console.log(req.originalUrl);
	req.db.sequelize.query('GetCruising')
		.then((result) => {
			console.log(result[0]);
			let cruising = result[0], weekDaysArray = [];
			let buf = cruising[0].Id;
			if (cruising[0].WeekDay !== null)
			{
				weekDaysArray.push({ id: cruising[0].Id, weekDay: cruising[0].WeekDay, weekDayCode: cruising[0].WeekDayCode });
			}
			for (let i = 1; i < cruising.length; i++)
			{
				console.log(i);
				if (cruising[i].WeekDay !== null)
				{
					weekDaysArray.push({ id: cruising[i].Id, weekDay: cruising[i].WeekDay, weekDayCode: cruising[i].WeekDayCode });
					let cruisId = cruising[i].Id;
					if (cruising[i].Id === buf)
					{
						delete cruising[i];
					}
					buf = cruisId;
				}
			}
			console.log(weekDaysArray);
			res.render('index',
				{
					layout: 'cruising/cruising',
					weekDaysArray: weekDaysArray,
					cruising: cruising
				});
		})
		.error((err) => {
			console.log(err);
		});

});

module.exports = router;