const express = require('express');
const router = express.Router();
const createStation = require('./createStation');

router.use('/create', createStation);

module.exports = router;