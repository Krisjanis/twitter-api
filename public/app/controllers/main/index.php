<?php
function _index () {
    $view = new View (APP_PATH . 'views/template.phtml');
    $content = new View (APP_PATH . 'views/general.phtml');

    $tweetscount = new Tweetcount();
    $existingTweetCount = $tweetscount->getTotalTweetCount();
    $tweetCountByDay = $tweetscount->getTweetCountByDay();
    $dayTweets = $tweetscount->getDayTweetCount();
    
    $tweets = new Tweet();
    $content->set('existingTweetCount', $existingTweetCount);
    $content->set('tweetCountByDay', $tweetCountByDay);
    $content->set('maxTweets', $dayTweets);

    $users = new User();
    $existingUserCount = $users->getTotalUserCount();
    $content->set('existingUserCount', $existingUserCount);


    $pageTitle = "Vispārējā statistika";
    $view->set('pageTitle', $pageTitle);
 
    $view->set('content', $content->fetch());
    $view->dump();
}