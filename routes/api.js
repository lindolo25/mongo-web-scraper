var express = require('express');
var router = express.Router();

router.post('/article', function(req, res, next) 
{
  res.send('respond with a resource');
});

router.delete('/article', function(req, res, next) 
{
  res.send('respond with a resource');
});

module.exports = router;
