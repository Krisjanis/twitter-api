<?php
require(dirname(__FILE__) . '/../../db-connect.php');
ini_set('memory_limit', '128M');

/**
 * Update retweet day count
 * @param date $currentdate
 */
function updateDayRetweetCount($currentdate) {
    $dbConnect = new database;
    $dbh = $dbConnect->getdbh();
    $stmt = $dbh->query("SELECT tweet_id, COUNT(user_id) AS count
                         FROM retweets
                         WHERE DATE(FROM_UNIXTIME(created_at)) = '" . $currentdate . "'
                         GROUP BY 1");
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($data as $row) {
        $retweet = $dbh->query("SELECT * FROM statistics_retweets WHERE tweet_id = '" . $row['tweet_id'] . "'");
        if ($retweet->fetchAll(PDO::FETCH_ASSOC)) {
            $dbh->query("UPDATE statistics_retweets
                         SET total_count = total_count+" . $row['count'] . ", yesterday_count = " . $row['count'] . "
                         WHERE tweet_id = '" . $row['tweet_id'] . "'");
        } else {
            $dbh->query("INSERT INTO statistics_retweets (tweet_id, total_count, yesterday_count)
                         VALUES ('" . $row['tweet_id'] . "', " . $row['count'] . ", " . $row['count'] . ")");
        }
    }
}

updateDayRetweetCount(date('Y-m-d', strtotime(date('Y-m-d') . '-1 day')));
