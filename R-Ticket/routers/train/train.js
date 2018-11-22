const express = require('express');
const router = express.Router();
const createTrain = require('./createTrain');

router.use('/create', createTrain);

module.exports = router;