<?php
MongoCursor::$timeout = -1;
require(dirname(__FILE__) . '/../../db-connect.php');
require(dirname(__FILE__) . '/../../mongo-connect.php');

/**
 * Save mentions
 * @param string $currentdate
 */
function saveMentions($currentdate) {
    $data = getMentions($currentdate);
    $dbConnect = new database;
    $dbh = $dbConnect->getdbh();

    $rows = array();
    foreach ($data as $tweet) {
        foreach ($tweet['entities']['user_mentions'] as $mention) {
            $rows[] = '(' . $tweet['id_str'] . ', ' . $mention['id'] . ', ' . strtotime($tweet['created_at']) . ', ' . 1 . ')';
        }
    }

    $offset = 500;
    $count = ceil(count($rows) / $offset);
    for ($i = 0; $i < $count; $i++) {
        $dbh->query("INSERT INTO user_mentions VALUES " . implode(', ', array_slice($rows, $i, $offset)));
    }
}

/**
 * Get mentions data
 * @param string $currentdate
 * @return MongoCursor
 */
function getMentions($currentdate) {
    $database = new mongoDatabase;
    $mongo = $database->getMongoDb();

    $query = array(
        'created_at' => array( '$regex' => '.*' . $currentdate . ' *' ),
        'entities.user_mentions' => array( '$exists' => true )
    );
    $fields = array(
        'entities.user_mentions' => true,
        'created_at' => true,
        'id_str' => true
    );

    $result = $mongo->tweets->find($query, $fields);

    return $result;
}

saveMentions(date('M d', strtotime(date('M d') . '-1 day')));

