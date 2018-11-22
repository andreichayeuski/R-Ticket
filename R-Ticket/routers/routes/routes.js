const express = require('express');
const router = express.Router();
const createStation = require('./createRoutes');

router.use('/create', createStation);

module.exports = router;