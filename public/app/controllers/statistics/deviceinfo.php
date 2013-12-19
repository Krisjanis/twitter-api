<?php
function _deviceinfo () {
    $view = new View (APP_PATH . 'views/template.phtml');
    $content = new View (APP_PATH . 'views/statistics/deviceinfo.phtml');

    $pageTitle = "Izmantotās ierīces";
    $view->set('pageTitle', $pageTitle);
    $view->set('content', $content->fetch());
    $view->dump();
}