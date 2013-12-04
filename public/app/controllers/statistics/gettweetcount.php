<?php
function _gettweetcount () {
    $tweets = new Tweet();
    $tweetsByHour = $tweets->getTweetsByDate();

    $date = new DateTime();
    $minDate = $date->getTimestamp() * 1000;
    $maxDate = 0;
    $values = array();
    foreach($tweetsByHour as $data) {
        $thisDate = $data['date'] * 1000;
        if ($minDate > $thisDate) $minDate = $thisDate;
        if ($maxDate < $thisDate) $maxDate = $thisDate;
        $value = array($thisDate, $data['count']);
        array_push($values, $value);
    }

    print_r(json_encode(array('values' => $values,
                              'from' => $minDate,
                              'to' => $maxDate,
                              'unit' => 's'
                              )));
}