<?php
class Statistics_Retweets extends Model
{
    /**
     * Get top retweeted tweets
     * @param int $from
     * @param int $to
     * @return array
     */
    function getTopRetweets($from = 0, $to = 20, $period = 'day')
    {
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
        $result = $this->simple_query("SELECT " . $data . " AS count, text
                                       FROM statistics_retweets
                                       JOIN tweets ON tweet_id = id
                                       ORDER BY " . $data . " DESC
                                       LIMIT " . $from . ", " . $to);
        return $result;
    }
}