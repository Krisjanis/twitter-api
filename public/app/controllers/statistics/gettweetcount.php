<?php
function _gettweetcount () {
    $tweets = new Tweet();
    $step = $_GET['step'];
    $from = $_GET['from'];
    $to = $_GET['to'];
    $tweetsCount = $tweets->getTweetsByTimePeriod($step, $from, $to);

    $date = new DateTime();
    $minDate = $date->getTimestamp() * 1000;
    $maxDate = 0;
    $values = array();
    foreach($tweetsCount as $data) {
        $thisDate = strtotime($data['date']) * 1000;
        if ($minDate > $thisDate) $minDate = $thisDate;
        if ($maxDate < $thisDate) $maxDate = $thisDate;
        $value = array($thisDate, $data['count']);
        array_push($values, $value);
    }

    print_r(json_encode(array('values' => $values,
        'from' => $minDate,
        'to' => $maxDate + 1,
        'unit' => $step
    )));
}