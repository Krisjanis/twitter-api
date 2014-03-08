<?php
function _updatetweetcount ($date) {
    $tweets = new Tweet();
    $data = $tweets->getCount($date);
    $i = 0;
    foreach ($data as $row) {
        $i++;
        $date = strtotime($row['date'] . ' ' . $row['hour'] . ':00');
        $count = $row['count'];
        $tweets->insertTweetCount($date, $count);
    }
}