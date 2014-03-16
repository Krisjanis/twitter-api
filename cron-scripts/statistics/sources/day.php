<?php
require(dirname(__FILE__) . '/../../db-connect.php');

/**
 * Update source count per day
 * @param date $currentdate
 */
function updateDaySourcesCount($currentdate) {
    $dbConnect = new database;
    $dbh = $dbConnect->getdbh();
    $stmt = $dbh->query("SELECT source, count(id) AS count
                         FROM tweets
                         WHERE DATE(FROM_UNIXTIME(created_at)) = '" . $currentdate . "'
                         GROUP BY 1
                         ORDER BY count DESC");
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($data as $row) {
        $source = $dbh->query("SELECT * FROM statistics_sources WHERE source = '" . $row['source'] . "'");
        if ($source) {
            $dbh->query("UPDATE statistics_sources
                         SET total_count = total_count+" . $row['count'] . ", yesterday_count = " . $row['count'] . "
                         WHERE source = '" . $row['source'] . "'");
        } else {
            $dbh->query("INSERT INTO statistics_sources (source, total_count, yesterday_count)
                         VALUES ('" . $row['source'] . "', " . $row['count'] . ", " . $row['count'] . ")");
        }
    }
}

updateDaySourcesCount(date('Y-m-d', strtotime(date('Y-m-d') . '-1 day')));