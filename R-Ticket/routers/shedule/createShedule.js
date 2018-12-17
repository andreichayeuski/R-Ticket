const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false});

router.use(bodyParser.json());

router.post('/', urlencodedParser, (req, res) => {
	console.log(req.body);
	req.db.sequelize.query('AddShedule :date', {
		replacements:
			{
				date: req.body.date
			}
	})
		.then((result) => {
			console.log(result[0][0]);
			if (result[0][0].result === 1)
			{
				res.redirect('http://r-ticket.chav:6608/shedule');
			}
			else
			{
				res.redirect('http://r-ticket.chav:6608/shedule');
			}
		})
		.error((err) => {
			console.log(err);
		});
});

module.exports = router;