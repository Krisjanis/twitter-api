<?php

use Orm\Model;

class Model_User_Profile extends Model
{
    protected static $_table_name = 'user_profile';
    protected static $_primary_key = array('user_id');
    protected static $_properties = array(
        'user_id',
        'image_url',
    );
    protected static $_belongs_to = array(
        'user' => array(
            'key_from' => 'user_id',
            'model_to' => 'Model_User_Account',
            'key_to' => 'id',
        )
    );
}