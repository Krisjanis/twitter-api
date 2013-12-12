<?php
function _venueinfo() {
    $venueName = (isset($_GET['name']) ? $_GET['name'] : null);
    $venueId = (isset($_GET['pointId']) ? $_GET['pointId'] : null);
    $topUserCount = (isset($_GET['users']) ? $_GET['users'] : 100);
    $topTweetCount = (isset($_GET['tweets']) ? $_GET['tweets'] : 100);
    if (isset($venueId)) {
        $view = new View (APP_PATH . 'views/template.phtml');
        $content = new View (APP_PATH . 'views/coordinates/venueinfo.phtml');

        $users = new User();
        $topUsers = $users->getTopUsersFromVenue($venueId, $topUserCount);
        $tweets = new Tweet();
        $topTweets = $tweets->getTopTweetsFromVenue($venueId, $topTweetCount);

        $pageTitle = $venueName;
        $content->set('pageTitle', $pageTitle);
        $content->set('users', $topUsers);
        $content->set('tweets', $topTweets);

        $view->set('pageTitle', $pageTitle);
        $view->set('content', $content->fetch());
        $view->dump();
    }
}