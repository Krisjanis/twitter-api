<?php
require(dirname(__FILE__) . '/../../db-connect.php');
ini_set('memory_limit', '128M');

/**
 * Update tweet sources total count
 * @param date $currentdate
 */
function updateTotalSourcesCount($currentdate) {
    $dbConnect = new database;
    $dbh = $dbConnect->getdbh();
    $stmt = $dbh->query("SELECT source, count(id) AS count
                         FROM tweets
                         WHERE DATE(FROM_UNIXTIME(created_at)) < '" . $currentdate . "'
                         GROUP BY 1
                         ORDER BY count DESC");
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($data as $row) {
        $source = $dbh->query("SELECT * FROM statistics_sources WHERE source = '" . $row['source'] . "'");
        if (!$source) {
            $dbh->query("UPDATE statistics_sources
                         SET total_count = " . $row['count'] . "
                         WHERE source = '" . $row['source'] . "'");
        } else {
            $dbh->query("INSERT INTO statistics_sources (source, total_count)
                             VALUES ('" . $row['source'] . "', '" . $row['count'] . "')");
        }
    }
}

updateTotalSourcesCount(date('Y-m-d', strtotime(date('Y-m-d') . '-1 day')));
