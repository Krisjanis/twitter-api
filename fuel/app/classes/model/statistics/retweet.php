<?php

use Orm\Model;

class Model_Statistics_Retweet extends Model
{
    protected static $_table_name = 'statistics_retweets';
    protected static $_primary_key = array('tweet_id');
    protected static $_properties = array(
        'tweet_id',
        'total_count',
        'last_month_count',
        'last_week_count',
        'yesterday_count',
    );

    /**
     * Get top retweets
     * @param int $from
     * @param int $to
     * @param string $period
     * @return array
     */
    public static function getTopRetweets($from = 0, $to = 20, $period = 'day') {
        switch ($period) {
            case 'day':
                $data = 'yesterday_count';
                break;
            case 'week':
                $data = 'last_week_count';
                break;
            case 'month':
                $data = 'last_month_count';
                break;
            case 'total':
                $data = 'total_count';
                break;
        }

        return DB::select('text', DB::expr($data . ' as count'))
            ->from('statistics_retweets')
            ->join('tweets')
            ->on('tweet_id', '=', 'id')
            ->order_by($data,'desc')
            ->limit($to)
            ->offset($from)
            ->execute()
            ->as_array();
    }
}