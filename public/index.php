<html>
<head>
    <title>Tvitstat</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="../assets/css/uikit.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/style.css">
    <script src="../assets/js/charts/jquery-1.9.1.min.js"></script>
    <script src="../assets/js/charts/knockout-2.2.1.js"></script>
    <script src="../assets/js/charts/globalize.min.js"></script>
    <script src="../assets/js/charts/dx.chartjs.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
</head>
<body>
<?php
$con = new mysqli('127.0.0.1', 'twitter', 'CvjWToO7', 'twitter');
$con->set_charset('utf8');
?>
<div class="wrapper">
    <nav class="uk-navbar uk-navbar-attached">
        <div class="uk-container uk-container-center">
            <ul class="main-nav uk-float-right">
                <li><a href="" class="uk-button uk-button-primary uk-button-large">Pagaidām</a></li>
                <li><a href="" class="uk-button uk-button-primary uk-button-large">te</a></li>
                <li><a href="" class="uk-button uk-button-primary uk-button-large">nekā</a></li>
                <li><a href="" class="uk-button uk-button-primary uk-button-large">vēl</a></li>
                <li><a href="" class="uk-button uk-button-primary uk-button-large">nav</a></li>
            </ul>
        </div>
    </nav>
    <div class="content uk-container uk-container-center">
        <h2 class="uk-h1">Vispārējā statistika</h2>
        <?php
        $existingCoord = $con->query("SELECT COUNT( DISTINCT user_id ) FROM tweets");
        $row = $existingCoord->fetch_row();
        ?>
        <p>Līdz šim sistēma ir savākusi <span class="uk-badge uk-badge-success"><?php echo $row[0] ?></span> unikālu lieotāju</p>

        <?php
        $existingCoord = $con->query("SELECT COUNT(id) FROM tweets");
        $row = $existingCoord->fetch_row();
        ?>
        <p>Līdz šim sistēma ir savākusi <span class="uk-badge uk-badge-success"><?php echo $row[0] ?></span> unikālu tvītu</p>

        <h2 class="uk-h1">Lietotāju aktivitāte no sistēmas sākuma</h2>
        <?php
            $existingCoord = $con->query("SELECT DATE( FROM_UNIXTIME( created_at ) ) AS DATE, COUNT( id ) AS id FROM tweets WHERE DATE( FROM_UNIXTIME( created_at ) ) < '2013-11-14' GROUP BY 1");
            $rows = $existingCoord->fetch_all();
        ?>
        <script type="text/javascript">
            $(function ()
                {
                    $("#chartContainer").dxChart({
                        dataSource: [
                            <?php foreach ($rows as $key => $row): ?>
                            {day: "<?php echo $row[0] ?>", oranges: <?php echo $row[1] ?>},
                            <?php endforeach; ?>
                            ],

                        series: {
                            argumentField: "day",
                            valueField: "oranges",
                            name: "Tvīti",
                            type: "bar",
                            color: '#45ada8'
                        }
                    });
                }

            );
        </script>
        <div id="chartContainer" style="width: 100%; height: 440px;"></div>

        <h2 class="uk-h1">Top populārākās vietas</h2>
        <script>
            function initialize() {
                var myLatlng1 = new google.maps.LatLng(56.92213226,23.97983948);
                var myLatlng2 = new google.maps.LatLng(56.96825779,24.12108421);
                var myLatlng3 = new google.maps.LatLng(56.92951004,24.03662682);
                var myLatlng4 = new google.maps.LatLng(56.92659443,24.10323143);
                var myLatlng5 = new google.maps.LatLng(56.94681751,24.12035465);
                var mapOptions = {
                    zoom: 12,
                    center: myLatlng1,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }
                var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

                var marker1 = new google.maps.Marker({
                    position: myLatlng1,
                    map: map
                });
                var contentString1 = '<h2>252</h2>';
                var infowindow1 = new google.maps.InfoWindow({
                    content: contentString1
                });

                var marker2 = new google.maps.Marker({
                    position: myLatlng2,
                    map: map
                });
                var contentString2 = '<h2>246</h2>';
                var infowindow2 = new google.maps.InfoWindow({
                    content: contentString2
                });

                var marker3 = new google.maps.Marker({
                    position: myLatlng3,
                    map: map
                });

                var contentString3 = '<h2>108</h2>';
                var infowindow3 = new google.maps.InfoWindow({
                    content: contentString3
                });
                var marker4 = new google.maps.Marker({
                    position: myLatlng4,
                    map: map
                });

                var contentString4 = '<h2>105</h2>';
                var infowindow4 = new google.maps.InfoWindow({
                    content: contentString4
                });

                var marker5 = new google.maps.Marker({
                    position: myLatlng5,
                    map: map
                });
                var contentString5 = '<h2>103</h2>';
                var infowindow5 = new google.maps.InfoWindow({
                    content: contentString5
                });

                google.maps.event.addListener(marker1, 'click', function() {
                    infowindow1.open(map,marker1);
                });
                google.maps.event.addListener(marker2, 'click', function() {
                    infowindow2.open(map,marker2);
                });
                google.maps.event.addListener(marker3, 'click', function() {
                    infowindow3.open(map,marker3);
                });
                google.maps.event.addListener(marker4, 'click', function() {
                    infowindow4.open(map,marker4);
                });
                google.maps.event.addListener(marker5, 'click', function() {
                    infowindow5.open(map,marker5);
                });
            }

            google.maps.event.addDomListener(window, 'load', initialize);

        </script>
        <div id="map-canvas"></div>
    </div>
</div>
</body>
</html>