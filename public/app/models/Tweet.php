<?php
class Tweet extends Model
{
    function Tweet()
    {
        parent::__construct('id', 'tweets', 'getdbh');

        $this->rs['id'] = '';
        $this->rs['user_id'] = '';
        $this->rs['created_at'] = '';
    }

    function getTotalTweetCount()
    {
        $result = $this->select("COUNT(id) as count");
        return $result[0]["count"];
    }

    function getTweetCountByDay()
    {
        $result = $this->select("DATE(FROM_UNIXTIME(created_at)) AS date, COUNT(id) AS count", "'count' IS NOT NULL group by 1");
        return $result;
    }

    function getTweetsByHour()
    {
        $result = $this->simple_query("SELECT DATE( FROM_UNIXTIME( created_at ) ) AS date, HOUR( FROM_UNIXTIME( created_at ) ) AS hour , COUNT( id ) AS count
                                        FROM tweets
                                        GROUP BY 1 , 2");
        return $result;
    }

    function getDates()
    {
        $result = $this->simple_query("SELECT DATE( FROM_UNIXTIME( created_at ) ) AS date
                                        FROM tweets
                                        GROUP BY 1");
        return $result;
    }

    function getDayTweetCount()
    {
        $result = $this->select("DATE(FROM_UNIXTIME(created_at)) AS date , COUNT(id) AS count", "'count' IS NOT NULL GROUP BY 1 ORDER BY count DESC LIMIT 1");
        return $result[0];
    }
}