<?php
MongoCursor::$timeout = -1;
require(dirname(__FILE__) . '/../../db-connect.php');
require(dirname(__FILE__) . '/../../mongo-connect.php');
require(dirname(__FILE__) . '/../../helper.php');
ini_set('memory_limit', '128M');

/**
 * Update source count per month
 * @param date $currentdate
 */
function updateMonthSourcesCount($currentdate) {
    $dbConnect = new database;
    $dbh = $dbConnect->getdbh();
    $data = getSources($currentdate);

    foreach ($data as $row) {
        $source = $dbh->query("SELECT * FROM statistics_sources WHERE source = '" . $row['source'] . "'");
        if ($source) {
            $dbh->query("UPDATE statistics_sources
                         SET last_month_count = " . $row['count'] . "
                         WHERE source = '" . $row['source'] . "'");
        } else {
            $dbh->query("INSERT INTO statistics_sources (source, total_count, last_month_count)
                         VALUES ('" . $row['source'] . "', " . $row['count'] . ", " . $row['count'] . ")");
        }
    }
}

/**
 * Get all used sources and count
 * @param string $currentdate
 * @return array
 */
function getSources($currentdate) {
    $database = new mongoDatabase;
    $mongo = $database->getMongoDb();

    $keys = new MongoCode('function(doc) {
                    return { "source": doc.source };
                }');
    $initial =  array('count' => 0);
    $reduce = "function (obj, prev) { prev.count++; }";
    $condition = array(
        'created_at' => array('$regex' => getDatesRegex($currentdate, 30))
    );
    $result = $mongo->tweets->group($keys, $initial, $reduce, $condition);

    return $result['retval'];
}

updateMonthSourcesCount(date('M d', strtotime(date('M d') . '-1 day')));