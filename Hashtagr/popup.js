!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
article = document.getElementsByTagName("article");

function range(start, stop, step) {
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }

    if (typeof step == 'undefined') {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
};

var opts = {
    lines: 11 // The number of lines to draw
, length: 10 // The length of each line
, width: 2 // The line thickness
, radius: 50 // The radius of the inner circle
, scale: 0.75 // Scales overall size of the spinner
, corners: 1 // Corner roundness (0..1)
, color: '#22313F' // #rgb or #rrggbb or array of colors
, opacity: 0.25 // Opacity of the lines
, rotate: 0 // The rotation offset
, direction: 1 // 1: clockwise, -1: counterclockwise
, speed: 2.2 // Rounds per second
, trail: 10 // Afterglow percentage
, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
, zIndex: 2e9 // The z-index (defaults to 2000000000)
, className: 'spinner' // The CSS class to assign to the spinner
, top: '60%' // Top position relative to parent
, left: '50%' // Left position relative to parent
, shadow: true // Whether to render a shadow
, hwaccel: false // Whether to use hardware acceleration
, position: 'absolute' // Element positioning

}

chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    $(".hashtags").hide();
    var target = document.getElementById('spin')
    var spinner = new Spinner(opts).spin(target)
    var url = tabs[0].url;
    var title = tabs[0].title;
    var tweet_text = title;
    rest_url = "http://178.62.70.247/hashtag/?url=" + url;
    $.getJSON(rest_url, function(json) {
        if (json.Hashtags.length == 0) {
            $(".message").replaceWith("<h2 class='message'>Are you sure you're at 88 mph? <small>(I couldn't find anything)</small></h2>");
            $("#spin").fadeOut("slow");
        }
        else {
            for (count in range(json.Hashtags.length)) {
                console.log(count);
                $(".hashtags").append('<li>' + String(json.Hashtags[count]) + '</li>');
            tweet_text += ' ' + json.Hashtags[count];
            };
            $('ul li:empty').remove();
            $("#spin").fadeOut("slow");
            $(".hashtags").fadeIn("slow");
            $(".buttons").append('<a href="https://twitter.com/intent/tweet?url=' + url + '&text=' + encodeURIComponent(tweet_text) + '"class="twitter-share-button">Tweet this!</a>');
        }
    });
});








