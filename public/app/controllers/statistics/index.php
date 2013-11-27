<?php
function _index () {
    $view = new View (APP_PATH . 'views/template.phtml');
    $content = new View (APP_PATH . 'views/statistics.phtml');

    $pageTitle = "Statistika";
    $view->set('pageTitle', $pageTitle);

    $view->set('content', $content->fetch());
    $view->dump();
}