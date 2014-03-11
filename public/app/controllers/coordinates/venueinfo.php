<?php
function _venueinfo() {
    $venueName = (isset($_GET['name']) ? $_GET['name'] : null);
    $venueId = (isset($_GET['pointid']) ? $_GET['pointid'] : null);
    $topUserCount = (isset($_GET['users']) ? $_GET['users'] : 0);
    $topTweetCount = (isset($_GET['tweets']) ? $_GET['tweets'] : 0);
    $usersFrom = (isset($_GET['usersfrom']) ? $_GET['usersfrom'] : 0);
    $tweetsFrom = (isset($_GET['tweetsfrom']) ? $_GET['tweetsfrom'] : 0);
    if (isset($venueId)) {
        $view = new View (APP_PATH . 'views/template.phtml');
        $content = new View (APP_PATH . 'views/coordinates/venueinfo.phtml');

        $topUsers = _getusers($venueId, $topUserCount, $usersFrom);
        $topTweets = _getTweets($venueId, $topTweetCount, $tweetsFrom);

        $pageTitle = $venueName;
        $content->set('venueId', $venueId);
        $content->set('pageTitle', $pageTitle);
        $content->set('users', $topUsers[0]);
        $content->set('usersCount', $topUsers[1][0]['count']);
        $content->set('tweets', $topTweets[0]);
        $content->set('tweetsCount', $topTweets[1][0]['count']);

        $view->set('pageTitle', $pageTitle);
        $view->set('content', $content->fetch());
        $view->dump();
    }
}

function _getusers($venueId, $topUserCount, $from) {
    $users = new User();
    return array($users->getTopUsersFromVenue($venueId, $topUserCount, $from), $users->getVenueUsersCount($venueId));
}

function _getTweets($venueId, $topTweetCount, $from) {
    $tweets = new Tweet();
    return array($tweets->getTopTweetsFromVenue($venueId, $topTweetCount, $from), $tweets->getVenueTweetsCount($venueId));
}