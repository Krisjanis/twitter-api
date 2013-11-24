<?php
function _index() {
    $venuesCount = (isset($_GET['venues']) ? $_GET['venues'] : 10);
    $view = new View (APP_PATH . 'views/template.phtml');
    $content = new View (APP_PATH . 'views/coordinates/map.phtml');

    $coordinates = new Coordinates();
    $coordinatesData = $coordinates->getData($venuesCount);

    $pageTitle = "Top koordinātes";

    $content->set('coordinates', $coordinatesData);
    $view->set('pageTitle', $pageTitle);
    $view->set('content', $content->fetch());
    $view->dump();
}