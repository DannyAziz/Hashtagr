article = document.getElementsByTagName("article");

if (article !== []) {
    var btn = document.createElement("BUTTON");
    var t = document.createTextNode("click dis yooo");
    btn.appendChild(t)
    document.body.appendChild(btn);

    rest_url = "http://0.0.0.0:9000/hashtag/?url=" + document.URL

    $.getJSON(rest_url, function( json ) {
        console.log(json.Hashtags);
    });


}
