$(document).ready(function() 
{
    $("#articles-list").on("click", "a.btn",saveArticle)
});

var saveArticle = function(e)
{
    e.preventDefault();
    var article = $(this).parents("article");
    var jarticle = $(article);

    const newArticle = {
        headline : jarticle.attr("data-headline"),
        link : jarticle.attr("data-link"),
        summary : jarticle.attr("data-summary"),
        section : jarticle.attr("data-section"),
        imgLink : jarticle.attr("data-imgLink"),
        source : jarticle.attr("data-source")
    }
    console.log(newArticle);

    const options = {
        contentType: "application/json",
        method: "POST",
        data: JSON.stringify(newArticle)
    };

    $.ajax("/api/article", options).then(function(result)
    {
        //console.log(result);
        if(result)
        {
            jarticle.attr("data-id", result._id);
        }
    });
}