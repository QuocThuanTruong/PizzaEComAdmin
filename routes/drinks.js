const express = require('express');
const router = express.Router();

const drinkController = require('../controller/drinkController')

router.get('/', drinkController.index)

router.get('/add', drinkController.add);

router.get('/update', drinkController.update);

module.exports = router;