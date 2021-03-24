var express = require('express');
var router = express.Router();

var SignupController = require('../controllers/signup')

router.get('/', SignupController.Index);
router.post('/signup/index', function(req, res){
    Controller.Create
  });
module.exports = router;
