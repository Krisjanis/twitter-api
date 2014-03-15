<?php
require(dirname(__FILE__) . '/../../db-connect.php');
ini_set('memory_limit', '128M');

/**
 * Update user mentions count per month
 * @param date $currentdate last day of month
 */
function updateMonthMentionsCount($currentdate) {
    $dbConnect = new database;
    $dbh = $dbConnect->getdbh();
    $stmt = $dbh->query("SELECT user_id, screen_name, COUNT(occurrences) AS count
                         FROM user_mentions
                         JOIN users ON user_id = id
                         WHERE DATE(FROM_UNIXTIME(mentioned_at))
                         BETWEEN '" . date('Y-m-d', strtotime($currentdate . '-1 month')) . "' AND '" . $currentdate . "'
                         GROUP BY 1");
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($data as $row) {
        $user = $dbh->query("SELECT * FROM statistics_user_mentions WHERE user_id = '" . $row['user_id'] . "'");
        $userData = $user->fetchAll(PDO::FETCH_ASSOC);
        if (!empty($userData)) {
            $dbh->query("UPDATE statistics_user_mentions
                         SET last_month_mentions = " . $row['count'] . "
                         WHERE user_id = '" . $row['user_id'] . "'");
        } else {
            $dbh->query("INSERT INTO statistics_user_mentions (user_id, screen_name, last_month_mentions)
                         VALUES ('" . $row['user_id'] . "', '" . $row['screen_name'] . "', " . $row['count'] . ")");
        }
    }
}

updateMonthMentionsCount(date('Y-m-d', strtotime(date('Y-m-d') . '-1 day')));
