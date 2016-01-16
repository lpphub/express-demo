var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Admin' });
});

router.get('/500', function(req, res, next) {
  res.render('500', { title: 'Admin' });
});

module.exports = router;
