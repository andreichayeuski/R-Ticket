const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false});

router.use(bodyParser.json());

router.get('/', (req, res) => {
	console.log(req.originalUrl);
	let user = [], role = [], country = [];
	req.db.sequelize.query('GetUser')
		.then((result) => {
			console.log(result[0]);
			user = result[0];
			req.db.sequelize.query('GetRole')
				.then((result) => {
					console.log(result[0]);
					role = result[0];
					req.db.sequelize.query('GetCountry')
						.then((result) => {
							console.log(result[0]);
							country = result[0];
							res.render('index',
								{
									layout: 'user/create',
									roles: role,
									countrys: country,
									users: user
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
		})
		.error((err) => {
			console.log(err);
			res.redirect('http://r-ticket.chav:6608');
		});
});

router.post('/', urlencodedParser, (req, res) => {
	console.log(req.body);
	req.db.sequelize.query('CreateUser :FName, :SName, :MName, :Email, :Birthday, :Sex' +
		', :Passport, :FNameEn, :SNameEn, :Telephone, :Login, :Password, :CountryId, :RoleId',
		{
			replacements:
				{
					FName: req.body.fname,
					SName: req.body.sname,
					MName: req.body.mname,
					Birthday: req.body.birthday,
					Email: req.body.email,
					Sex: parseInt(req.body.sex),
					Passport: req.body.passport,
					FNameEn: req.body.fname_en,
					SNameEn: req.body.sname_en,
					Telephone: req.body.telephone === '' ? undefined : req.body.telephone,
					Login: req.body.login,
					Password: req.body.password,
					CountryId: parseInt(req.body.countryId),
					RoleId: parseInt(req.body.roleId)
				}
	})
		.then((result) => {
			console.log(result[0][0]);
			if (result[0][0].result === 1)
			{
				res.redirect('http://r-ticket.chav:6608/user/create');
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