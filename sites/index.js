var async = require("async");
var sourceList = [];
sourceList.push(require("../sites/miamiherald"));


var sourceContainsTopic = function(topic, sourceTopics)
{
    if(typeof sourceTopics[topic] === "undefined") return null;
    else return sourceTopics[topic];    
}

var sources = {
    get count()
    {
        return sourceList.count;
    },

    topics: {
        News: "News",
        Sports: "Sports",
        Politics: "Politics",
        Entertainment: "Entertainment"
    },

    getArticles : function(topic = this.topics.News)
    {
        return new Promise(function(resolve, reject) 
        {
            var allArticles = [];        
            async.concat(sourceList, async function(source, callback) 
            {
                topicLink = source.getTopicLink(topic);
                if(topicLink !== undefined)
                {
                    var sourceArticles = await source.getArticles(topicLink);
                    return sourceArticles;
                }
                else return [];
            }, function(err, allArticles)
            { 
                resolve(allArticles); 
            });
        });
    }
}

sources.getArticles().then( function(articles) 
{ 
    console.log(articles) 
});