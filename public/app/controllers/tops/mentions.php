<?php
function _mentions($from = 0, $to = 20, $period = 'day') {
    $mentions = new Statistics_Usermention();
    $view = new View (APP_PATH . 'views/tops/mentions.phtml');
    $view->set('users', $mentions->getTopMentions($from, $to, $period));
    $view->dump();
}