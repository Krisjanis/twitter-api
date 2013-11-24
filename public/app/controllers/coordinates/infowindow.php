<?php
function _infowindow() {
    $rquestedData = 'all';
    if (isset($_GET['data'])) {
        $rquestedData = $_GET['data'];
    }
    $venue = _getFoursquareData($_POST['pointLat'], $_POST['pointLng'], $rquestedData);
    if ($rquestedData != 'all') {
        echo $venue;
    } else {
        $view = new View (APP_PATH . 'views/coordinates/infowindow.phtml');
        $view->set('venue', $venue);
        $view->dump();
    }
}

function _getClientData() {
    $clientId = 'LBDQ3PC2AGJ4GO1O0MJRWRASRMEWEUVW125IWX3D4QOM2ZPK';
    $clientSecret = 'YBCL0CYYFC4FMAZ3JZJ2WPHRCCG2V52YLADKMTZPUEJAGOW2';
    return array($clientId, $clientSecret);
}

function _getFoursquareData($pointLat, $pointLng, $rquestedData) {
    $client = _getClientData();
    $coordinates = $pointLat . '%2C' . $pointLng;
    $requestUrl = 'https://api.foursquare.com/v2/venues/search?ll=' . $coordinates
                . '&limit=1&client_id=' . $client[0] . '&client_secret='
                . $client[1] . '&v=20131119';
    $curlhandle = curl_init();
    curl_setopt($curlhandle, CURLOPT_URL, $requestUrl);
    curl_setopt($curlhandle, CURLOPT_RETURNTRANSFER, 1);

    $response = curl_exec($curlhandle);
    curl_close($curlhandle);

    $json = json_decode($response, true);
    $venue = $json['response']['venues'][0];
    if ($rquestedData != 'all') {
        echo $venue[$rquestedData];
    } else {
        return $venue;
    }
}