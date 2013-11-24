$(document).ready(function() {
    if ($('.map-menu').length) {
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
                    thisPoint.html(data);
                }
            });
        });
    }
});