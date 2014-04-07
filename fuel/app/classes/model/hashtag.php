<?php

use Orm\Model;

class Model_Hashtag extends Model
{
    protected static $_table_name = 'hashtags';
    protected static $_properties = array(
        'id',
        'hashtag',
        'user_id',
    );
    protected static $_has_many = array(
        'has_hashtag' => array(
            'key_from' => 'id',
            'model_to' => 'Model_HasHashtag',
            'key_to' => 'hashtag_id',
        )
    );
}