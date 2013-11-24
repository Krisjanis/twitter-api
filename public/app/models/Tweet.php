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
        $result = $this->SELECT("DATE( FROM_UNIXTIME(created_at)) AS date, COUNT(id) AS count", "'count' IS NOT NULL group by 1");
        return $result;
    }
}