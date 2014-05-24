<?php
header('Content-Type: text/html; charset=utf-8');
MongoCursor::$timeout = -1;
require(dirname(__FILE__) . '/db-connect.php');
require(dirname(__FILE__) . '/mongo-connect.php');

/**
 * Save tweet count per hour
 * @param date $currentdate
 */
function saveTweetsCount($currentdate) {
    $count = getTweetsCount($currentdate);
    $database = new database;
    $dbh = $database->getdbh();
    foreach ($count as $day) {
        $dbh->query("INSERT INTO tweets_count VALUES (" . strtotime($day['date'] . '-3 hour') . ", " . $day['count'] . ")");
    }
}

/**
 * Get tweet count for each hour
 * @param date $currentdate
 * @return array
 */
function getTweetsCount($currentdate) {
    $database = new mongoDatabase;
    $mongo = $database->getMongoDb();

    $keys = new MongoCode('function(doc) {
                    var date = new Date(doc.created_at);
                    var dateKey = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getHours();
                    return { "date": dateKey };
                }');
    $initial =  array('count' => 0);
    $reduce = "function (obj, prev) { prev.count++; }";
    $condition = array(
        'created_at' => array( '$regex' => '.*' . $currentdate . ' *' ),
        'retweeted_status' => array( '$exists' => false )
    );
    $result = $mongo->tweets->group($keys, $initial, $reduce, $condition);

    return $result['retval'];
}

/**
 * Save top 100 word count per day
 * @param date $currentdate
 */
function saveWordsCount($currentdate) {
    $data = getTweetText($currentdate);

    $tweets = array();
    foreach ($data as $row) {
        $tweets[] = $row['text'];
    }

    $min_times_present = 10;
    $words = array();
    foreach ($tweets as $str) {
        $words_string = preg_split("/\P{L}+/u", $str, 0, PREG_SPLIT_NO_EMPTY);
        foreach ($words_string as $word) {
            if (mb_strlen($word, "UTF-8") > 3) {
                $word = mb_convert_case($word, MB_CASE_LOWER, "UTF-8");
                if ($word != 'http' && $word != 'https') {
                    $words[$word] = (isset($words[$word])) ? $words[$word] + 1 : 1;
                }
            }
        }
    }
    $result_arr = array_filter($words, function($value) use ($min_times_present) {
        return ($value >= $min_times_present);
    });
    arsort($result_arr, SORT_NUMERIC);

    $database = new database;
    $dbh = $database->getdbh();
    $dbh->query("INSERT INTO words_count VALUES ('" . strtotime($currentdate) . "', '" . serialize(array_slice($result_arr, 0, 100)) . "')");
    echo "INSERT INTO words_count VALUES ('" . strtotime($currentdate) . "', '" . serialize(array_slice($result_arr, 0, 100)) . "')";
}

/**
 * Get tweet text
 * @param string $currentdate
 * @return MongoCursor
 */
function getTweetText($currentdate) {
    $database = new mongoDatabase;
    $mongo = $database->getMongoDb();

    $query = array(
        'created_at' => array( '$regex' => '.*' . $currentdate . ' *' ),
        'retweeted_status' => array( '$exists' => false )
    );
    $fields = array('text' => true);

    $result = $mongo->tweets->find($query, $fields);

    return $result;
}

saveWordsCount(date('M d', strtotime(date('M d') . '-1 day')));
saveTweetsCount(date('M d', strtotime(date('M d') . '-1 day')));
