<?php
function _index () {
    $view = new View (APP_PATH . 'views/template.phtml');
    $content = new View (APP_PATH . 'views/tops.phtml');

    $hashtags = new Hashtag();
    $top20 = $hashtags->getTopHashtags(20);
    $content->set('hashtags', $top20);

    $users = new User();
    $top20users = $users->getTopUserMentions(20);
    $content->set('users', $top20users);

    $pageTitle = "Topi";
    $view->set('pageTitle', $pageTitle);

    $view->set('content', $content->fetch());
    $view->dump();
}