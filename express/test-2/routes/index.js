var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express', content: 'Hello World', foot: 'copyright@2019' });
});

module.exports = router;
