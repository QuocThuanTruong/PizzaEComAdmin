const express = require('express');
const router = express.Router();

const drinkController = require('../controller/drinkController')

router.get('/', drinkController.index)

router.post('/', drinkController.delete)

router.get('/add', drinkController.add);

router.post('/add', drinkController.addInfo);

router.get('/update/:id', drinkController.update);

router.post('/update/:id', drinkController.updateInfo);

module.exports = router;