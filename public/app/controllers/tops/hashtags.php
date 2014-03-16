<?php
function _hashtags($from = 0, $to = 20) {
    $hashtags = new Hashtag();
    $view = new View (APP_PATH . 'views/tops/hashtags.phtml');
    $view->set('hashtags', $hashtags->getTopHashtags($to));
    $view->dump();
}