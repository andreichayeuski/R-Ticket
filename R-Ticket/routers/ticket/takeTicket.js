const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false});

router.use(bodyParser.json());

router.post('/', urlencodedParser, (req, res) => {
	console.log(req.body);
	console.log(req.originalUrl);
	console.log(req.user);
	if (req.user.login === undefined)
	{
		req.db.sequelize.query('TakeTicket :spaceId, :login',
			{
				replacements:{
					spaceId: parseInt(req.body.spaceId),
					login: req.body.login
				}
			})
			.then((result) => {
				console.log(result);
				if (result === 1)
				{
					res.redirect('http://r-ticket.chav:6608/ticket/ticket');
				}
				else
				{

				}
			})
			.error((err) => {
				console.log(err);
			});
	}
	else
	{
		req.db.sequelize.query('TakeTicket :spaceId, :login',
			{
				replacements:{
					spaceId: parseInt(req.body.spaceId),
					login: req.user.login
				}
			})
			.then((result) => {
				console.log(result);
				if (result === 1)
				{
					res.redirect('http://r-ticket.chav:6608/ticket/ticket');
				}
				else
				{

				}
			})
			.error((err) => {
				console.log(err);
			});
	}
});

module.exports = router;