const express = require('express');
const router = express.Router();

const sideController = require('../controller/sideController')

router.get('/', sideController.index)

router.post('/', sideController.delete)

router.get('/add', sideController.add);

router.post('/add', sideController.addInfo);

router.get('/update/:id', sideController.update);

router.post('/update/:id', sideController.updateInfo);

module.exports = router;