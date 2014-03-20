<?php
function _index () {
    $view = new View (APP_PATH . 'views/template.phtml');
    $content = new View (APP_PATH . 'views/main/index.phtml');

    _setVariables($content);

    $view->set('pageTitle', 'Vispārējā statistika');
    $view->set('content', $content->fetch());
    $view->dump();
}

function _setVariables($content) {
    $statistics = _getTweetStatistics();

    $content->set('lastMonthTweetCount', $statistics['last_month']);
    $content->set('existingTweetCount', $statistics['total']);
    $content->set('tweetCountByDay', $statistics['by_day']);
    $content->set('tweetCountByTwoWeeks', $statistics['two_weeks']);
    $content->set('maxTweets', $statistics['top_day']);

    $content->set('existingUserCount', _getUserStatistics());
}

function _getTweetStatistics() {
    $tweets = new Statistics_Tweetcount();
    $lastMonthTweetCount = $tweets->getLastMonthTweetCount();
    $totalTweetCount = $tweets->getTotalTweetCount();
    $tweetCountByDay = $tweets->getTweetCountByDay();
    $tweetCountByTwoWeeks = $tweets->getTweetCountByTwoWeeks();
    $dayTweets = $tweets->getTopDay();

    return array(
        'last_month' => $lastMonthTweetCount,
        'total' => $totalTweetCount,
        'by_day' => $tweetCountByDay,
        'two_weeks' => $tweetCountByTwoWeeks,
        'top_day' => $dayTweets
    );
}

function _getUserStatistics() {
    $users = new User();
    return $users->getTotalUserCount();
}