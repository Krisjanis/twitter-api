<?php
require(dirname(__FILE__) . 'db-connect.php');

/**
 * Save tweet count per hour
 * @param date $currentdate
 */
function saveTweetsCount($currentdate) {
    $dbh = getdbh();
    $stmt = $dbh->query("
                SELECT DATE(FROM_UNIXTIME(created_at)) AS date, HOUR(FROM_UNIXTIME(created_at)) AS hour, COUNT(id) AS count
                FROM tweets
                WHERE 'count' IS NOT NULL
                AND DATE(FROM_UNIXTIME(created_at)) = '" . $currentdate . "'
                GROUP BY 1, 2");
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $i = 0;
    foreach ($data as $row) {
        $i++;
        $date = strtotime($row['date'] . ' ' . $row['hour'] . ':00');
        $count = $row['count'];
        $dbh->query("INSERT INTO tweets_count VALUES (" . $date . ", " . $count . ")");
    }
}

/**
 * Save top 100 word count per day
 * @param date $currentdate
 */
function saveWordsCount($currentdate) {
    $dbh = getdbh();
    $stmt = $dbh->query("SELECT text, DATE(FROM_UNIXTIME(created_at)) AS date 
                         FROM tweets WHERE DATE(FROM_UNIXTIME(created_at)) = '" . $currentdate . "'");
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $tweets = array();
    foreach ($data as $row) {
        $tweets[] = $row;
    }

    $min_times_present = 10;
    $words = array();
    foreach ($tweets as $str) {
        $words_string = preg_split("/\P{L}+/u", $str['text'], 0, PREG_SPLIT_NO_EMPTY);
        foreach ($words_string as $word) {
            if (mb_strlen($word, "UTF-8") > 3) {
                $word = mb_convert_case($word, MB_CASE_LOWER, "UTF-8");
                if ($word != 'http' || $word != 'https') {
                    $words[$word] = (isset($words[$word])) ? $words[$word] + 1 : 1;
                }
            }
        }
    }
    $result_arr = array_filter($words, function($value) use ($min_times_present) {
        return ($value >= $min_times_present);
    });
    arsort($result_arr, SORT_NUMERIC);
    $dbh->query("INSERT INTO words_count VALUES ('" . strtotime($currentdate) . "', '" . serialize(array_slice($result_arr, 0, 100)) . "')");
}

saveWordsCount(date('Y-m-d', strtotime(date('Y-m-d') . '-1 day')));
saveTweetsCount(date('Y-m-d', strtotime(date('Y-m-d') . '-1 day')));
