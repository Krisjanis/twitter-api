<?php
function _retweets($from = 0, $to = 20, $period = 'day') {
    $retweets = new Statistics_Retweets();
    $view = new View (APP_PATH . 'views/tops/retweets.phtml');
    $view->set('retweets', $retweets->getTopRetweets($from, $to, $period));
    $view->dump();
}