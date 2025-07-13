const express = require('express');
const { getPublicServices } = require('../controllers/serviceController');

const router = express.Router();

router.get('/', getPublicServices);

module.exports = router;
