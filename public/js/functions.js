$(document).ready(function() {
    getTopPlaceNames();
    secondaryMenuPosition();
    switchTopWordsArrow();
    loadTops();
});

$(window).load(function() {
    loadTops();
});

$(window).resize(function() {
    secondaryMenuPosition();
});

$(document).keydown(function(e){
    switchTopWordsKey(e);
});

function getTopPlaceNames() {
    if (jQuery('.secondary-menu').length) {
        jQuery('.top-cordinates').each(function() {
            var thisPoint = $(this);
            jQuery.ajax({
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
}

function secondaryMenuPosition() {
    var nav = jQuery('nav .uk-container.uk-container-center'),
        secondaryMenu = jQuery('.secondary-menu');
    secondaryMenu.css({
        'top': nav.height() + 2,
        'margin-left': '-' + (secondaryMenu.width() / 2)
    });
}

function switchTopWordsArrow() {
    jQuery('.top-words').last().addClass('active');
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

function loadVenueData(container, param, object) {
    var limit = 10,
        button = jQuery(container),
        url = button.attr('data-load-link'),
        from = button.attr('data-count'),
        maxData = button.attr('data-max-count'),
        table = jQuery('table.' + object + ' tbody tr');
    var newUrl = url + '&' + param + '=' + from + '&' + object + '=' + limit;
    jQuery.ajax({
        url: newUrl,
        type: 'POST',
        success: function(data) {
            newData = jQuery(data).find('table.' + object + ' tbody tr');
            if (newData.length) {
                newData.insertAfter(table.last());
            } else {
                button.attr('disabled', 'disabled');
            }
            button.attr('data-count', parseInt(from) + limit);
            if (maxData <= (parseInt(from) + limit) || newData.length < limit) {
                button.attr('disabled', 'disabled');
            }
        }
    });
}

function scrollToTop() {
    jQuery('html, body').animate({ scrollTop:0 }, 200);
}



function loadTops() {
    var baseUrl = jQuery('.top-wrapper').attr('data-base-url');
    if (jQuery('.top-wrapper').length) {
        jQuery('.data-table').click(function() {
            var container = jQuery(this),
                url = container.attr('data-next-url');
            if (url && !container.hasClass('disabled')) {
                container.addClass('disabled');
                jQuery.ajax({
                    url: baseUrl + url,
                    type: 'POST',
                    success: function(data) {
                        jQuery(data).insertAfter(container.find('.title'));
                    }
                });
            }
        });
    }
}