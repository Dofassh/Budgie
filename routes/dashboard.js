var express = require('express');
var router = express.Router();

var DashboardController = require('../controllers/dashboard')


router.get('/',  DashboardController.Index);
router.post('/', DashboardController.Create);
router.get('/new', DashboardController.New);

module.exports = router;
