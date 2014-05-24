<?php
require(dirname(__FILE__) . '/../public/config.php');

class mongoDatabase {
    /**
     * Connect to mongo database
     * @return MongoDB
     */
    function getMongoDb() {
        $mongo = new Mongo();
        $db = $mongo->selectDB('twitter');
        return $db;
    }
}