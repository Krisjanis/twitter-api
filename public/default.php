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
$existingCoord = $con->query("SELECT DATE( FROM_UNIXTIME( created_at ) ) AS DATE, COUNT( id ) AS count FROM tweets GROUP BY 1");
while($result = $existingCoord->fetch_array())
{
    $rows[] = $result;
}
?>
<script type="text/javascript">
    $(function ()
            {
                $("#chartContainer").dxChart({
                    dataSource: [
                        {day: "2013-10-28", oranges: 28917},
                        {day: "2013-10-29", oranges: 27754},
                        {day: "2013-10-30", oranges: 26104},
                        {day: "2013-10-31", oranges: 21500},
                        {day: "2013-11-01", oranges: 26253},
                        {day: "2013-11-02", oranges: 23030},
                        {day: "2013-11-03", oranges: 25437},
                        {day: "2013-11-04", oranges: 26009},
                        {day: "2013-11-05", oranges: 24941},
                        {day: "2013-11-06", oranges: 24786},
                        {day: "2013-11-07", oranges: 24369},
                        {day: "2013-11-08", oranges: 23731},
                        {day: "2013-11-09", oranges: 22468},
                        {day: "2013-11-10", oranges: 23462},
                        {day: "2013-11-11", oranges: 25186},
                        {day: "2013-11-12", oranges: 22859},
                        {day: "2013-11-13", oranges: 24010},
                         <?php foreach ($rows as $key => $row): ?>
                         {day: "<?php echo $row[DATE] ?>", oranges: <?php echo $row[count] ?>},
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
<?php
$existingCoord = $con->query("SELECT DATE( FROM_UNIXTIME( created_at ) ) AS DATE, COUNT( id ) AS count FROM tweets GROUP BY 1");
while($result = $existingCoord->fetch_array())
{
    $rows[] = $result;
}
?>
?>
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
        var myLatlng6 = new google.maps.LatLng(56.9484852,24.10816669);
        var myLatlng7 = new google.maps.LatLng(56.94608604,24.10765171);
        var myLatlng8 = new google.maps.LatLng(56.94541893,24.07902718);
        var myLatlng9 = new google.maps.LatLng(56.94776484,24.1154228);
        var myLatlng10 = new google.maps.LatLng(56.95500313,24.11767244);

        var marker6 = new google.maps.Marker({
            position: myLatlng6,
            map: map
        });
        var contentString6 = '<h2>76</h2>';
        var infowindow6 = new google.maps.InfoWindow({
            content: contentString6
        });

        var marker7 = new google.maps.Marker({
            position: myLatlng7,
            map: map
        });
        var contentString7 = '<h2>45</h2>';
        var infowindow7 = new google.maps.InfoWindow({
            content: contentString7
        });

        var marker8 = new google.maps.Marker({
            position: myLatlng8,
            map: map
        });
        var contentString8 = '<h2>35</h2>';
        var infowindow8 = new google.maps.InfoWindow({
            content: contentString8
        });

        var marker9 = new google.maps.Marker({
            position: myLatlng9,
            map: map
        });
        var contentString9 = '<h2>35</h2>';
        var infowindow9 = new google.maps.InfoWindow({
            content: contentString9
        });

        var marker10 = new google.maps.Marker({
            position: myLatlng10,
            map: map
        });
        var contentString10 = '<h2>33</h2>';
        var infowindow10 = new google.maps.InfoWindow({
            content: contentString10
        });

        google.maps.event.addListener(marker6, 'click', function() {
            infowindow6.open(map,marker6);
        });
        google.maps.event.addListener(marker7, 'click', function() {
            infowindow7.open(map,marker7);
        });
        google.maps.event.addListener(marker8, 'click', function() {
            infowindow8.open(map,marker8);
        });
        google.maps.event.addListener(marker9, 'click', function() {
            infowindow9.open(map,marker9);
        });
        google.maps.event.addListener(marker10, 'click', function() {
            infowindow10.open(map,marker10);
        });
    }

    google.maps.event.addDomListener(window, 'load', initialize);

</script>
<div id="map-canvas"></div>
