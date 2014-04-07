<?php

use Orm\Model;

class Model_Tweet extends Model
{
    protected static $_table_name = 'tweets';
    protected static $_properties = array(
        'id',
        'user_id',
        'text',
        'created_at',
    );
    protected static $_has_one = array(
        'has_coordinates' => array(
            'key_from' => 'id',
            'model_to' => 'Model_HasCoordinates',
            'key_to' => 'tweet_id',
        )
    );
    protected static $_belongs_to = array(
        'user' => array(
            'key_from' => 'user_id',
            'model_to' => 'Model_User_Account',
            'key_to' => 'id',
        )
    );

    /**
     * Gets top tweets from venue
     * @param int $venueId coordinate ID
     * @param int $limit tweet count
     * @param $from tweet top offset
     * @return Model_Tweet
     */
    public static function getTopTweetsFromVenue($venueId, $limit = 10, $from) {
        return parent::find('all', array(
            'order_by' => array('created_at' => 'desc'),
            'related' => array(
                'has_coordinates' => array(
                    'where' => array(array('coordinate_id', '=', $venueId)),
                ),
            ),
            'rows_limit' => $limit,
            'rows_offset' => $from,
        ));
    }
}