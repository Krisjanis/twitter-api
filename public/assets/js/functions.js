$(document).ready(function() {
    getTopPlaceNames();
    secondaryMenuPosition();
    switchTopWordsArrow();
    loadTops();
    countUsedWords();
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
    var wrapper = jQuery('.top-wrapper'),
        baseUrl = wrapper.attr('data-base-url'),
        imgPath = wrapper.attr('data-img-path');
    if (jQuery('.top-wrapper').length) {
        jQuery('.data-table button').click(function() {
            var button = jQuery(this),
                period = button.attr('data-period');
                model = button.parent().attr('data-model'),
                container = jQuery('.data-table.' + model);
            if (!container.hasClass('disabled') && button.attr('disabled') == undefined) {
                if (!button.hasClass('loaded')) {
                    wrapper.find('button').attr('disabled', 'disabled');
                    container.addClass('disabled');
                    container.find('button').removeClass('active');
                    button.addClass('active');
                    button.addClass('loaded');
                    jQuery.ajax({
                            url: baseUrl + 'tops/' + model + '/0/20/' + period,
                            type: 'POST',
                            beforeSend: function() {
                                if (!container.hasClass('opened')) {
                                    container.append('<img class="loader" src="' + imgPath + 'loader.gif"/>');
                                } else {
                                    container.find('table').animate({ opacity: 0.5 });
                                }
                            },
                            success: function(data) {
                                var content = jQuery(data);
                                content.addClass(period);
                                container.find('.loader').remove();
                                container.find('table').hide();
                                container.find('table').animate({ opacity: 1 });
                                container.append(content);
                                container.addClass('opened');
                                container.removeClass('disabled');
                                wrapper.find('button').removeAttr('disabled');
                            }
                        });
                } else {
                    container.find('table').hide();
                    container.find('table.' + period).show();
                }
            }
        });
    }
}

function countUsedWords() {
    jQuery('.top-words.uk-panel-box').each(function() {
        var count = jQuery(this).find('.word.used').length;
        jQuery(this).find('div.count').html(count + '/100');
    });
}