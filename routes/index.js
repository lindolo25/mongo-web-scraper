var express = require('express');
var router = express.Router();
var sources = require("../sites");
var createError = require('http-errors');
var mongoose = require("mongoose");
var db = require("../models");
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/webScraper";

router.get("/users/saved", (req, res, next) => 
{ 
    // mongoose.connect(MONGODB_URI).then(error => 
    //     {
    //         if(error) return next(createError(500));

    //         db.Article.find({}, (error, docs) => 
    //             {
    //                 if(error) return next(createError(500));
    //                 res.render('index', { title: "Saved Articles", articles: docs });
    //                 mongoose.disconnect();
    //             });
    //     });
    res.send("Saved content here ...");
});

router.get('/:topic?', function(req, res, next) 
{
    var topic = req.params.topic ? req.params.topic.trim().toLowerCase() : null;
    
    if(topic && sources.topics[topic] !== undefined)
    {
        sources.getArticles(topic).then(function(articles) 
        {
            res.render('index', { title: topic.capitalize(), articles: articles });
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
            res.render('index', { title: sources.topics.news.capitalize(), articles: articles });
        });
    }
});

module.exports = router;
