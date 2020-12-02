const express = require('express');
const router = express.Router();

const pizzaController = require('../controller/pizzaController')

router.get('/', pizzaController.index)

router.post('/', pizzaController.delete)

router.get('/add', pizzaController.add);

router.post('/add', pizzaController.addInfo);

router.get('/update/:id', pizzaController.update);

router.post('/update/:id', pizzaController.updateInfo);

module.exports = router;