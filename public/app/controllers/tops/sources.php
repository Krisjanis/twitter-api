<?php
function _sources($from = 0, $to = 20) {
    $sources = new Statistics_Source();
    $view = new View (APP_PATH . 'views/tops/sources.phtml');
    $view->set('sources', $sources->getTopSourcesTotal($from, $to));
    $view->dump();
}