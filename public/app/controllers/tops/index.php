<?php
function _index () {
    $view = new View (APP_PATH . 'views/template.phtml');
    $content = new View (APP_PATH . 'views/tops.phtml');

    $content->set('users', _getTopMentions(0, 20));
    $content->set('hashtags', _getTopHashatgs(20));
    $content->set('retweets', _getTopRetweets(20));
    $content->set('sources', _getTopSource(0, 20));

    $pageTitle = "Topi";
    $view->set('pageTitle', $pageTitle);

    $view->set('content', $content->fetch());
    $view->dump();
}

function _getTopMentions($from, $to) {
    $mentions = new Statistics_Usermention();
    return $mentions->getTopMentionsTotal($from, $to);
}

function _getTopHashatgs($to) {
    $hashtags = new Hashtag();
    return $hashtags->getTopHashtags($to);
}

function _getTopRetweets($to) {
    $tweets = new Tweet();
    return $tweets->getMostRetweeted($to);
}

function _getTopSource($from, $to) {
    $sources = new Statistics_Source();
    return $sources->getTopSourcesTotal($from, $to);
}