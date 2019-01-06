var axios = require("axios");
var cheerio = require("cheerio");
var Article = require("../models/article");
var topics = {
    News: "https://www.miamiherald.com/news/",
    Sports: "https://www.miamiherald.com/sports/",
    Politics: "https://www.miamiherald.com/entertainment/",
    Entertainment: "https://www.miamiherald.com/entertainment/"
};

module.exports = {
    sourceName : "Miami Herald",

    getTopicLink: function(topic) 
    {
        return topics[topic];  
    },

    getArticles: async function(topic)
    {
        var result = [];
        var response = await axios.get(topic).catch((error) => console.log(error));
        
        if(response === undefined) return result;

        var $ = cheerio.load(response.data);
        var articles =  $("#story-list article");        

        articles.each((i, article) => {
            var temp = new Article();
            temp.headline = $(article).find("h4.title>a").text().trim();
            temp.link = $(article).find("h4.title>a").attr("href");
            temp.summary = $(article).find("p.summary").text().trim();
            temp.section = $(article).find("h2.kicker").text().trim();
            temp.imgLink = $(article).find("div.picture>a>img").attr("src");
            result.push(temp);
        });

        return result;
    }
};