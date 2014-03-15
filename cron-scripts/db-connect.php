<?php
require(dirname(__FILE__) . '/../public/config.php');

$GLOBALS['db_host'] = $CONFIG['db_host'];
$GLOBALS['username'] = $CONFIG['username'];
$GLOBALS['password'] = $CONFIG['password'];
$GLOBALS['db_table'] = $CONFIG['db_table'];

class database {
    /**
     * Get PDO database connection
     * @return \PDO
     */
    function getdbh() {
        if (!isset($GLOBALS['dbh']))
            try {
                $options = array(
                    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
                );
                $GLOBALS['dbh'] = new PDO('mysql:host=' . $GLOBALS['db_host'] . ';dbname=' . $GLOBALS['db_table'], $GLOBALS['username'], $GLOBALS['password'], $options);
            } catch (PDOException $e) {
                die('Connection failed: ' . $e->getMessage());
            }
        return $GLOBALS['dbh'];
    }
}
