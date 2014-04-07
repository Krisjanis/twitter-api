<?php

use Orm\Model;

class Model_HasHashtag extends Model
{
    protected static $_table_name = 'has_hashtags';
    protected static $_primary_key = array('hashtag_id');
    protected static $_properties = array(
        'hashtag_id',
        'tweet_id',
        'user_id',
        'occurences',
    );
    protected static $_belongs_to = array(
        'tweet' => array(
            'key_from' => 'hashtag_id',
            'model_to' => 'Model_Hashtag',
            'key_to' => 'id',
        )
    );
}