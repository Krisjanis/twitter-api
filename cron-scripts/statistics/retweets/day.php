<?php
MongoCursor::$timeout = -1;
require(dirname(__FILE__) . '/../../db-connect.php');
require(dirname(__FILE__) . '/../../mongo-connect.php');
ini_set('memory_limit', '128M');

/**
 * Update retweet day count
 * @param date $currentdate
 */
function updateDayRetweetCount($currentdate) {
    $dbConnect = new database;
    $dbh = $dbConnect->getdbh();
    $stmt = $dbh->query("SELECT tweet_id, COUNT(user_id) AS count
                         FROM retweets
                         WHERE DATE(FROM_UNIXTIME(created_at)) = '" . $currentdate . "'
                         GROUP BY 1");
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    var_dump($data); die;
    foreach ($data as $row) {
        $retweet = $dbh->query("SELECT * FROM statistics_retweets WHERE tweet_id = '" . $row['tweet_id'] . "'");
        if ($retweet->fetchAll(PDO::FETCH_ASSOC)) {
            $dbh->query("UPDATE statistics_retweets
                         SET total_count = total_count+" . $row['count'] . ", yesterday_count = " . $row['count'] . "
                         WHERE tweet_id = '" . $row['tweet_id'] . "'");
        } else {
            $dbh->query("INSERT INTO statistics_retweets (tweet_id, total_count, yesterday_count)
                         VALUES ('" . $row['tweet_id'] . "', " . $row['count'] . ", " . $row['count'] . ")");
        }
    }
}

function getDayRetweetCount($currentdate) {
    $database = new mongoDatabase;
    $mongo = $database->getMongoDb();

    $keys = new MongoCode('function(doc) {
                    //var date = new Date(doc.created_at);
                    //var dateKey = (date.getFullYear() + 1) + "-" + date.getMonth() + "-" + date.getDate() + "-" + date.getHours();
                    return { "tweet_id": dateKey };
                }');
    $initial =  array('count' => 0);
    $reduce = "function (obj, prev) { prev.count++; }";
    $condition = array(
        'created_at' => array( '$regex' => '.*' . $currentdate . ' *' ),
    );
    $result = $mongo->tweets->group($keys, $initial, $reduce, $condition);

    return $result['retval'];
}

updateDayRetweetCount('2014-01-18');
//updateDayRetweetCount(date('Y-m-d', strtotime(date('Y-m-d') . '-1 day')));
