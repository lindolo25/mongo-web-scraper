$(document).ready(function() 
{
    $("#articles-list").on("click", "a.btn", saveArticle);
    $("#saved-articles-list").on("click", "a.btn", confirmRemoveArticle);
    $("#delete-confirm").on("click", removeArticle);
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

var confirmRemoveArticle = function(e)
{
    e.preventDefault();
    var article = $(this).parents("article");
    var jarticle = $(article);
    const toDelete = jarticle.attr("data-id");
    $('#delete-confirm').attr("data-id",toDelete);
    $('#delete-modal').modal({});
}

var removeArticle = function(e)
{
    e.preventDefault();
    const toDelete = { id : $(this).attr("data-id") }

    const options = {
        contentType: "application/json",
        method: "DELETE",
        data: JSON.stringify(toDelete)
    };

    $.ajax("/api/article", options).then(function(result)
    {
        //console.log(result);
        if(result)
        {
            //$("article[data-id='{toDelete.Da}']")
        }
    });
}