const express = require('express');
const router = express.Router();
const createShedule = require('./createShedule');

router.use('/create', createShedule);

router.get('/', (req, res) => {
	console.log(req.originalUrl);
	res.render('index',
		{
			layout: 'shedule/shedule'
		});
});

module.exports = router;