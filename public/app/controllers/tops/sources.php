<?php
function _sources($from = 0, $to = 20, $period = 'day') {
    $sources = new Statistics_Source();
    $view = new View (APP_PATH . 'views/tops/sources.phtml');
    $view->set('sources', $sources->getTopSources($from, $to, $period));
    $view->dump();
}