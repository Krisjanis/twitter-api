<?php
/**
 * Get regex string with dates
 * @param string $currentdate
 * @param int $count
 * @return string
 */
function getDatesRegex($currentdate, $count) {
    $dates = array();
    $dates[0] = explode(' ', $currentdate);
    for ($i = 1; $i < $count; $i++) {
        $previousDate = implode(' ', $dates[$i - 1]);
        $newDate = date('M d', strtotime($previousDate . '-1 day'));
        $dates[$i] = explode(' ', $newDate);
    }

    $uniqueDates = array();
    foreach ($dates as $date) {
        if (!isset($uniqueDates[$date[0]])) {
            $uniqueDates[$date[0]] = array();
        }
        $uniqueDates[$date[0]][] = $date[1];
    }

    $regexParts = array();
    foreach ($uniqueDates as $month => $date) {
        $regexParts[] = '(' . $month . ') (' . implode('|', $date) . ')';
    }

    return '.*(' . implode('|', $regexParts) . ') *';
}