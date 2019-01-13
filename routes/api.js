var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var db = require("../models");
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/webScraper";

router.post('/article', function(req, res) 
{
    mongoose.connect(MONGODB_URI, {useNewUrlParser: true}, error => 
    {
        if(error) return res.json(false);

        let newArticle = new db.Article({
            headline : req.body.headline,
            link : req.body.link,
            summary : req.body.summary,
            section : req.body.section,
            imgLink : req.body.imgLink,
            source : req.body.source
        });        

        newArticle.save((error, article) => 
        {
            if (error) return res.json(false);

            mongoose.disconnect();
            res.json(article);
        });
    });
});

router.delete('/article', function(req, res, next) 
{
    if(!req.body.id) return res.json(false);

    mongoose.connect(MONGODB_URI, {useNewUrlParser: true}, error => 
    {
        if(error) return res.json(false);       

        db.Article.findByIdAndRemove(req.body.id, (error) => 
        {
            if (error) return res.json(false);

            mongoose.disconnect();
            res.json(true);
        });
    });
});

module.exports = router;
