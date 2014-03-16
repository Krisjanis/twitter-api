<?php
class Statistics_Tweetcount extends Model
{
    function Statistics_Tweetcount()
    {
        parent::__construct('date', 'tweets_count', 'getdbh'); 
    }

    /**
     * Get last month tweet count
     * @return int
     */
    function getLastMonthTweetCount()
    {
        $to = date('Y-m-d', strtotime(date('Y-m-d') . '-1 day'));
        $from = date('Y-m-d', strtotime($to . '-1 month +1 day'));
        $result = $this->select("SUM(count) AS total_count", "DATE(FROM_UNIXTIME(time)) BETWEEN '" . $from . "' AND '" . $to . "'");
        return $result[0]["total_count"];
    }

    /**
     * Get total tweet count
     * @return int
     */
    function getTotalTweetCount()
    {
        $result = $this->select("SUM(count) AS total_count");
        return $result[0]["total_count"];
    }

    /**
     * Get tweet count by day
     * @return array
     */
    function getTweetCountByDay()
    {
        $result = $this->select("DATE(FROM_UNIXTIME(time)) AS date, SUM(count) as count", "'count' IS NOT NULL GROUP BY 1");
        return $result;
    }

    /**
     * Get day with max tweet count
     * @return array
     */
    function getTopDay()
    {
        $result = $this->select("DATE(FROM_UNIXTIME(time)) AS date , SUM(count) AS count", "'count' IS NOT NULL GROUP BY 1 ORDER BY count DESC LIMIT 1");
        return $result[0];
    }
}