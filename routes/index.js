var express = require('express');
var router = express.Router();
var sources = require("../sites/");
var createError = require('http-errors');

/* GET home page. */
router.get('/:topic?', function(req, res, next) 
{
  var topic = req.params.topic ? req.params.topic.trim().toLowerCase() : null;
  
  if(topic && sources.topics[topic] !== undefined)
  {
    sources.getArticles(topic).then(function(articles) 
    {
      res.render('index', { title: 'Express', articles: articles });
    });
  }
  else if(topic)
  {
    next(createError(404));
  }
  else
  {
    sources.getArticles().then(function(articles) 
    {
      res.render('index', { title: 'Express', articles: articles });
    });
  }
});

module.exports = router;
