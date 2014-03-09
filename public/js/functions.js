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
    switchTopWordsArrow();
});

$(window).resize(function() {
    secondaryMenuPosition();
});

$(document).keydown(function(e){
    switchTopWordsKey(e);
});

function secondaryMenuPosition() {
    var nav = jQuery('nav .uk-container.uk-container-center'),
        secondaryMenu = jQuery('.secondary-menu');
    secondaryMenu.css({
        'top': nav.height() + 2,
        'margin-left': '-' + (secondaryMenu.width() / 2)
    });
}

function switchTopWordsArrow() {
    jQuery('.top-words-wrapper .prev').click(function() {
        switchTop('prev', 'next');
    });
    jQuery('.top-words-wrapper .next').click(function() {
        switchTop('next', 'prev');
    });
}

function switchTopWordsKey(e) {
    if (e.keyCode == 37) { //left arrow
       switchTop('prev', 'next');
       return false;
    }
    if (e.keyCode == 39) { //right arrow
       switchTop('next', 'prev');
       return false;
    }
}

function switchTop(state, other) {
    var activeWords = jQuery('.top-words.active'),
        stateActive = eval('activeWords.' + state + '()'),
        stateButton = jQuery('.top-words-wrapper .' + state);
    if (stateActive.length) {
        activeWords.removeClass('active');
        stateActive.addClass('active');
        jQuery('.top-words-wrapper .' + other).removeAttr('disabled');
    } else {
        stateButton.attr('disabled', 'disabled');
    }
    if (eval('!stateActive.' + state + '().length')) {
        stateButton.attr('disabled', 'disabled');
    }
}