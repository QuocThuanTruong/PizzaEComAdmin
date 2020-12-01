const express = require('express');
const router = express.Router();

const pizzaController = require('../controller/pizzaController')

router.get('/', pizzaController.index)

router.get('/add', pizzaController.add);

router.post('/add', pizzaController.confirmAdd);

router.get('/update', pizzaController.update);

module.exports = router;