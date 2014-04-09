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

    /**
     * Get top users from venue
     * @param int $venueId
     * @param int $limit
     * @param int $from
     * @return Model_User_Account
     */
    public static function getTopUsersFromVenue($venueId, $limit = 10, $from = 0) {
        return DB::query("SELECT has_coordinates.user_id, screen_name, COUNT( screen_name ) AS count, image_url
                          FROM users
                          JOIN has_coordinates ON id = user_id
                          JOIN user_profile ON has_coordinates.user_id = user_profile.user_id
                          WHERE coordinate_id = " . $venueId . "
                          GROUP BY 2
                          ORDER BY count DESC
                          LIMIT " . $from . " , " . $limit)->execute()->as_array();
    }
}