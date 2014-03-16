<?php
class Statistics_Retweets extends Model
{
    /**
     * Get all time top retweeted tweets
     * @param int $from
     * @param int $to
     * @return array
     */
    function getTopRetweetsTotal($from = 0, $to = 20)
    {
        $result = $this->simple_query("SELECT total_count AS count, text
                                       FROM statistics_retweets
                                       JOIN tweets ON tweet_id = id
                                       ORDER BY total_count DESC
                                       LIMIT " . $from . ", " . $to);
        return $result;
    }
}