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

    /**
     * Get top hashtags
     *
     * @param int $limit
     * @return array
     */
    public static function getTopHashtags($limit = 20)
    {
        $results = DB::select(DB::expr('hashtag_id AS id'), DB::expr('COUNT( hashtag_id ) AS count'), 'hashtag')
                ->from('has_hashtags')
                ->join('hashtags')
                ->on('hashtag_id', '=', 'id')
                //->group_by(1)
                ->order_by('count', 'desc')
                ->limit($limit)
                ->execute();

        $result = array();
        foreach($results as $key => $hashtag) {
            $result[$key]['hashtag'] = $hashtag['hashtag'];
            $result[$key]['count'] = $hashtag['count'];
        }

        return $result;
    }
}