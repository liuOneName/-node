const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
  // res.send('this is test')
  console.log(req.query)
  res.format({
    'application/json': function(){
      res.json(req.body);
    },
  })
})

module.exports = router;
