const express = require('express');
const router = express.Router();

const sideController = require('../controller/sideController')

router.get('/', sideController.index)

router.get('/add', sideController.add);

router.get('/update', sideController.update);

module.exports = router;