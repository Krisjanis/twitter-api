<?php
function _index () {
    $view = new View (APP_PATH . 'views/template.phtml');
    $content = new View (APP_PATH . 'views/tops/index.phtml');

    $content->set('hashtags', _getTopHashatgs(20));

    $pageTitle = "Topi";
    $view->set('pageTitle', $pageTitle);

    $view->set('content', $content->fetch());
    $view->dump();
}

function _getTopHashatgs($to) {
    $hashtags = new Hashtag();
    return $hashtags->getTopHashtags($to);
}