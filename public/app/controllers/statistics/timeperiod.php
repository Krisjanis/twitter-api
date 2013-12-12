<?php
function _timeperiod () {
    $view = new View (APP_PATH . 'views/template.phtml');
    $content = new View (APP_PATH . 'views/statistics/timeperiod.phtml');

    $pageTitle = "Statistika laika periodā";
    $view->set('pageTitle', $pageTitle);
    $view->set('content', $content->fetch());
    $view->dump();
}