<?php
function _userstweets () {

    $view = new View (APP_PATH . 'views/template.phtml');
    $content = new View (APP_PATH . 'views/statistics/userstweets.phtml');

    $users = new User();
    if (isset($_POST['from']) && isset($_POST['to']))
    {
        $counts = $users->getUsersTweetsCountLimit($_POST['from'], $_POST['to']);
        $content->set('from', $_POST['from']);
        $content->set('to', $_POST['to']);
        $content->set('isPost', 1);
    }
    else {
        $counts = $users->getUsersTweetsCount();
        $content->set('isPost', 0);
    }

    $content->set('counts', $counts);

    $pageTitle = "Lietotāju skaits un to tvītu skaits";
    $view->set('pageTitle', $pageTitle);

    $view->set('content', $content->fetch());
    $view->dump();
}