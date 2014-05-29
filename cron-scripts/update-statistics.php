<?php
MongoCursor::$timeout = -1;
require(dirname(__FILE__) . '/db-connect.php');
require(dirname(__FILE__) . '/mongo-connect.php');
ini_set('memory_limit', '128M');

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

    $minTimesPresent = 10;
    $words = array();
    foreach ($tweets as $str) {
        //echo '45678904567890';
        $wordsString = preg_split("/\P{L}+/u", $str, 0, PREG_SPLIT_NO_EMPTY);
        //echo '4567890';
        foreach ($wordsString as $word) {
            if (mb_strlen($word, "UTF-8") > 3) {
                $word = mb_convert_case($word, MB_CASE_LOWER, "UTF-8");
                if ($word != 'http' && $word != 'https') {
                    $words[$word] = (isset($words[$word])) ? $words[$word] + 1 : 1;
                }
            }
        }
    }
    $resultArr = array_filter($words, function($value) use ($minTimesPresent) {
        return ($value >= $minTimesPresent);
    });
    arsort($resultArr, SORT_NUMERIC);

    $database = new database;
    $dbh = $database->getdbh();
    $dbh->query("INSERT INTO words_count VALUES ('" . strtotime($currentdate) . "', '" . json_encode(array_slice($resultArr, 0, 100), JSON_UNESCAPED_UNICODE) . "')");
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
        'created_at' => array( '$regex' => '.*' . $currentdate . ' *' )
    );
    $fields = array('text' => true);

    $result = $mongo->tweets->find($query, $fields);

    return $result;
}

saveWordsCount(date('M d', strtotime(date('M d') . '-1 day')));
saveTweetsCount(date('M d', strtotime(date('M d') . '-1 day')));
