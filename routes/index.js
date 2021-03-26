var express = require('express');
var router = express.Router();

 //GET home page.

var HomeController = require('../controllers/index');

router.get('/', HomeController.Index);

module.exports = router;
