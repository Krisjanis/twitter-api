<?php
require('../../../config.php');

/**
 * The development database settings. These get merged with the global settings.
 */
return array(
    'default' => array(
        'connection' => array(
            'dsn' => 'mysql:host=' . $CONFIG['db_host'] . ';dbname=' . $CONFIG['db_table'],
            'username' => $CONFIG['username'],
            'password' => $CONFIG['password'],
        ),
    ),
);
