<?php

use Orm\Model;

class Model_User_Account extends Model
{
    protected static $_table_name = 'users';
    protected static $_properties = array(
        'id',
        'screen_name',
    );
    protected static $_belongs_to = array(
        'has_coordinates' => array(
            'key_from' => 'id',
            'model_to' => 'Model_HasCoordinates',
            'key_to' => 'user_id',
        )
    );
    protected static $_has_one = array(
        'profile' => array(
            'key_from' => 'id',
            'model_to' => 'Model_User_Profile',
            'key_to' => 'user_id',
        )
    );
}