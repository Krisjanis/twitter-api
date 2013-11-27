<?php
function _byhour () {
    $view = new View (APP_PATH . 'views/template.phtml');
    $content = new View (APP_PATH . 'views/statistics/byhour.phtml');

    $tweets = new Tweet();
    $tweetsByHour = $tweets->getTweetsByHour();
    $dates = $tweets->getDates();
    $content->set('rows', $tweetsByHour);
    $content->set('dates', $dates);

    $pageTitle = "Statistika pa stundām";
    $view->set('pageTitle', $pageTitle);

    $view->set('content', $content->fetch());
    $view->dump();
}