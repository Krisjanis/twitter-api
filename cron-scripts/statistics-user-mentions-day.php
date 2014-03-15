<?php
require(dirname(__FILE__) . '/db-connect.php');

/**
 * Update user mentions count per day
 * @param date $currentdate
 */
function updateDayMentionsCount($currentdate) {
    $dbConnect = new database;
    $dbh = $dbConnect->getdbh();
    $stmt = $dbh->query("SELECT user_id, screen_name, DATE(FROM_UNIXTIME(mentioned_at)) AS date, COUNT(occurrences) AS count
                         FROM user_mentions
                         JOIN users ON user_id = id
                         WHERE DATE(FROM_UNIXTIME(mentioned_at)) = '" . $currentdate . "'
                         GROUP BY 1, 3");
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($data as $row) {
        $user = $dbh->query("SELECT * FROM statistics_user_mentions WHERE user_id = '" . $row['user_id'] . "'");
        $userData = $user->fetchAll(PDO::FETCH_ASSOC);
        if (!empty($userData)) {
            $dbh->query("UPDATE statistics_user_mentions
                         SET yesterday_mentions = " . $row['count'] . ", total_mentions = total_mentions+" . $row['count'] . "
                         WHERE user_id = '" . $row['user_id'] . "'");
        } else {
            $dbh->query("INSERT INTO statistics_user_mentions (user_id, screen_name, total_mentions, yesterday_mentions)
                         VALUES ('" . $row['user_id'] . "', '" . $row['screen_name'] . "', " . $row['count'] . ", " . $row['count'] . ")");
        }
    }
}

updateDayMentionsCount(date('Y-m-d', strtotime(date('Y-m-d') . '-1 day')));
