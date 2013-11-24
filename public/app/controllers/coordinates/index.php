<?php
function _index($msg='Coordinates!') {
    $view = new View (APP_PATH . 'views/template.phtml');
    $content = new View (APP_PATH . 'views/coordinates.phtml');
    $view->set('content', $content->fetch());
    $view->dump();
}