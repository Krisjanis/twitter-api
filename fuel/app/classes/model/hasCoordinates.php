<?php

use Orm\Model;

class Model_HasCoordinates extends Model
{
    protected static $_table_name = 'has_coordinates';
    protected static $_primary_key = array('tweet_id');
    protected static $_properties = array(
        'coordinate_id',
        'tweet_id',
        'user_id',
    );
    protected static $_belongs_to = array(
        'tweet' => array(
            'key_from' => 'tweet_id',
            'model_to' => 'Model_Tweet',
            'key_to' => 'id',
        )
    );
    protected static $_has_many = array(
        'user' => array(
            'key_from' => 'user_id',
            'model_to' => 'Model_User_Account',
            'key_to' => 'id',
        )
    );
}