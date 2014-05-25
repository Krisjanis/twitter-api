<?php
MongoCursor::$timeout = -1;
require(dirname(__FILE__) . '/../../db-connect.php');
require(dirname(__FILE__) . '/../../mongo-connect.php');

/**
 * Save retweets
 * @param string $currentdate
 */
function saveRetweets($currentdate) {
    $data = getRetweets($currentdate);
    $dbConnect = new database;
    $dbh = $dbConnect->getdbh();

    $rows = array();
    foreach ($data as $tweet) {
        $rows[] = '("' . $tweet['retweeted_status']['id_str'] . '", ' . $tweet['user']['id'] . ', ' . strtotime($tweet['created_at']) . ')';
    }
    $offset = 500;
    $count = ceil(count($rows) / $offset);
    for ($i = 0; $i < $count; $i++) {
        $dbh->query("INSERT INTO retweets VALUES " . implode(', ', array_slice($rows, $i, $offset)));
    }
}

/**
 * Get retweet data
 * @param string $currentdate
 * @return MongoCursor
 */
function getRetweets($currentdate) {
    $database = new mongoDatabase;
    $mongo = $database->getMongoDb();

    $query = array(
        'created_at' => array( '$regex' => '.*' . $currentdate . ' *' ),
        'retweeted_status' => array( '$exists' => true )
    );
    $fields = array('retweeted_status.id_str' => true, 'user.id' => true, 'created_at' => true);

    $result = $mongo->tweets->find($query, $fields);

    return $result;
}

saveWordsCount(date('M d', strtotime(date('M d') . '-1 day')));

