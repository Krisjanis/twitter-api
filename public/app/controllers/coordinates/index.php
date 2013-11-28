<?php
function _index() {
    $maxTopVenues = 15;
    $venuesCount = (isset($_GET['venues']) ? $_GET['venues'] : 15);
    $view = new View (APP_PATH . 'views/template.phtml');
    $content = new View (APP_PATH . 'views/coordinates/map.phtml');

    $coordinates = new Coordinates();
    $coordinatesData = $coordinates->getTopCoordinates($venuesCount, $maxTopVenues);
    $pageTitle = "Top vietas";

    $content->set('maxTopVenues', $maxTopVenues);
    $content->set('coordinates', $coordinatesData);
    $view->set('pageTitle', $pageTitle);
    $view->set('content', $content->fetch());
    $view->dump();
}