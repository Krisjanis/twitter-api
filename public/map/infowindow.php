<?php

$pointId = $_POST['pointId'];
$pointCount = 'Tweets: ' . $_POST['pointCount'];
$pointLat = $_POST['pointLat'];
$pointLng = $_POST['pointLng'];

$clientId = 'LBDQ3PC2AGJ4GO1O0MJRWRASRMEWEUVW125IWX3D4QOM2ZPK';
$clientSecret = 'YBCL0CYYFC4FMAZ3JZJ2WPHRCCG2V52YLADKMTZPUEJAGOW2';
$coordinates = $pointLat . '%2C' . $pointLng;
$requestUrl = 'https://api.foursquare.com/v2/venues/search?ll=' . $coordinates
            . '&limit=1&client_id=' . $clientId . '&client_secret='
            . $clientSecret . '&v=20131119';

$curlhandle = curl_init();
curl_setopt($curlhandle, CURLOPT_URL, $requestUrl);
curl_setopt($curlhandle, CURLOPT_RETURNTRANSFER, 1);

$response = curl_exec($curlhandle);
curl_close($curlhandle);

$json = json_decode($response, true);
$venue = $json['response']['venues'][0];

if(!isset($venue['location']['city'])) { $venue['location']['city'] = ''; }
if(!isset($venue['location']['state'])) { $venue['location']['state'] = ''; }
if(!isset($venue['location']['country'])) { $venue['location']['country'] = ''; }

$venueId = $venue['id'];
$venueName = $venue['name'];
$venueLocation = implode(' ', array($venue['location']['city'], $venue['location']['state'], $venue['location']['country']));
$venueCategory = $venue['categories'][0]['name'];
$venueCategoryIconUrl = $venue['categories'][0]['icon']['prefix'] . 'bg_32' . $venue['categories'][0]['icon']['suffix'];
$venueCheckinsCount = 'Foursquare checkins: ' . $venue['stats']['checkinsCount'];
$venueUsersCount = 'Foursquare users: ' . $venue['stats']['usersCount'];
if (isset($venue['url'])) {
    $venueUrl = $venue['url'];
} else {
    $venueUrl = '';
}

echo '<div class="venueInfo"><h2><img class="category" src="' . $venueCategoryIconUrl . '"/>' . $venueName . '</h2>'
        . '<p>'
        . implode('</p><p>', array($venueLocation, $venueCategory, $pointCount, $venueCheckinsCount, $venueUsersCount))
        . '<p><a href="https://foursquare.com/v/' . $venueId . '">foursquare</a></p>'
        . '<p><a href="' . $venueUrl . '">' . $venueUrl . '</a></p></div>';
/*
https://api.foursquare.com/v2/venues/search?
ll=56.92201057%2C23.98543451
&client_id=LBDQ3PC2AGJ4GO1O0MJRWRASRMEWEUVW125IWX3D4QOM2ZPK&client_secret=YBCL0CYYFC4FMAZ3JZJ2WPHRCCG2V52YLADKMTZPUEJAGOW2&v=20131117
*/