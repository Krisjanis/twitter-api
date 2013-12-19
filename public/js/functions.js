$(document).ready(function() {
    if ($('.secondary-menu').length) {
        $('.top-cordinates').each(function() {
            var thisPoint = $(this);
            $.ajax({
                url: thisPoint.attr('name'),
                type: 'POST',
                data: {
                    pointLat: thisPoint.attr('lat'),
                    pointLng: thisPoint.attr('lng')
                },
                success: function(data) {
                    if (data) {
                        thisPoint.html(data);
                    }
                }
            });
        });
    }

    secondaryMenuPosition();
    wordTop();
});

$(window).resize(function() {
    secondaryMenuPosition();
});

function secondaryMenuPosition() {
    var nav = jQuery('nav .uk-container.uk-container-center'),
        secondaryMenu = jQuery('.secondary-menu');
    secondaryMenu.css({
        'top': nav.height() + 2,
        'margin-left': '-' + (secondaryMenu.width() / 2)
    });
}

function wordTop() {
    var words = new Array(),
        thisWord,
        text,
        priority,
        minPriority = 14,
        dayCount = jQuery('.top-words').length,
        topWords = jQuery('.top-words .word');
    topWords.each(function() {
        thisWord = jQuery(this);
        text = thisWord.text();
        if (words[text] == undefined) {
            words[text] = 1;
        }
        words[text]++;
    });
    topWords.each(function() {
        thisWord = jQuery(this);
        priority = Math.ceil((dayCount * 1.5) - (words[thisWord.text()]));
        if (priority < minPriority) {
            priority = minPriority;
        }
        thisWord.attr('priority', priority);
        thisWord.css('font-size', priority);
    });
}