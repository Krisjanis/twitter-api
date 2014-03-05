<?php
class Tweetcount extends Model
{
    function Tweetcount()
    {
        parent::__construct('date', 'tweets_count', 'getdbh'); 
    }

    function getTotalTweetCount()
    {
        $result = $this->select("SUM(count) AS total_count");
        return $result[0]["total_count"];
    }

    function getTweetCountByDay()
    {
        $result = $this->select("DATE(FROM_UNIXTIME(time)) AS date, SUM(count) as count", "'count' IS NOT NULL GROUP BY 1");
        return $result;
    }

    function getDayTweetCount()
    {
        $result = $this->select("DATE(FROM_UNIXTIME(time)) AS date , SUM(count) AS count", "'count' IS NOT NULL GROUP BY 1 ORDER BY count DESC LIMIT 1");
        return $result[0];
    }
}