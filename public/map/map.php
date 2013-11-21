<?php
require_once('model/coordinates.php');
$data = new Model_Coordinates;

if (isset($_GET['venues']) && $_GET['venues'] > 10) {
    $displayVenues = $_GET['venues'];
} elseif(!isset($displayVenues)) {
    $displayVenues = 10;
}

$coordinates = $data->getCoordinates($displayVenues);
$currentUrl = $_SERVER['PHP_SELF'];
?>

<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
        <meta charset="utf-8">
        <title>Tvitstat</title>
        <link rel="stylesheet" type="text/css" href="styles.css">
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
        <script src="../../assets/js/charts/jquery-1.9.1.min.js"></script>
        <script>
            function initialize() {
                var coordinates = <?php echo json_encode($coordinates); ?>,
                    mapOptions = {
                        zoom: 6,
                        center: new google.maps.LatLng(coordinates[1][0], coordinates[1][1]),
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    },
                    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions),
                    icon = {
                        url: 'marker.png',
                        anchor: new google.maps.Point(16, 16)
                    },
                    infowindow = new google.maps.InfoWindow();

                <?php for ($i = 1; $i <= $displayVenues; $i++): ?>
                    <?php $id = $coordinates[$i][2]; ?>
                    var data = coordinates[<?php echo $i; ?>],
                        marker<?php echo $id; ?> = new google.maps.Marker({
                            position: new google.maps.LatLng(data[0], data[1]),
                            map: map,
                            icon: icon,
                            pointid: data[2],
                            pointcount: data[3],
                            pointlat: data[0],
                            pointlng: data[1]
                        });
                        addMarkerListener(marker<?php echo $id; ?>);
                <?php endfor; ?>

                jQuery('#menu a').click(function () {
                    var markerId = jQuery(this).attr('id');
                    getInfoWindow(eval(markerId));
                });
                        
                function addMarkerListener(marker) {
                    google.maps.event.addListener(marker, 'click', function() {
                        infowindow.close();
                        getInfoWindow(marker);
                    });
                }

                function getInfoWindow(marker) {
                    jQuery.ajax({
                        url: 'infowindow.php',
                        type: 'POST',
                        data: {
                            pointId: marker.pointid,
                            pointCount: marker.pointcount,
                            pointLat: marker.pointlat,
                            pointLng: marker.pointlng
                        },
                        beforeSend: function() {
                            map.setCenter(marker.position);
                            infowindow.setContent('<img class="loading-gif" src="loader.gif"/>');
                            infowindow.open(map, marker);
                        },
                        success: function(data) {
                            infowindow.setContent(data);
                            infowindow.open(map, marker);
                        }
                    });
                }
            }
            google.maps.event.addDomListener(window, 'load', initialize);
        </script>
    </head>
    <body>
        <div class="map-wrapper">
            <div class="map-menu">
                <p id="menu">
                    <?php for($i=1; $i<=10; $i++): ?>
                        <a id="marker<?php echo $coordinates[$i][2] ?>"><?php echo $i; ?></a>
                    <?php endfor; ?>
                </p>
                <a href="<?php echo $currentUrl ?>?venues=10">10</a>
                <a href="<?php echo $currentUrl ?>?venues=100">100</a>
                <a href="<?php echo $currentUrl ?>?venues=1000">1000</a>
                <a href="<?php echo $currentUrl ?>?venues=10000">10000</a>
            </div>
            <div id="map-canvas"></div>
        </div>
    </body>
</html>