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

    function getMostRetweeted($count)
    {
        $result = $this->simple_query("SELECT tweet_id, count( retweets.user_id ) AS count, text
                                        FROM retweets
                                        JOIN tweets ON tweet_id = tweets.id
                                        GROUP BY 1
                                        ORDER BY count DESC
                                        LIMIT 0, " . $count);
        return $result;
    }

    function getSource($count)
    {
        $result = $this->simple_query("SELECT source, count( id ) AS count
                                        FROM tweets
                                        GROUP BY source
                                        ORDER BY count DESC
                                        LIMIT 0, " . $count);
        return $result;
    }

    function getTweetsByTimePeriod($period, $from, $to)
    {
        switch ($period) {
            case 'd':
                $select = 'DATE(FROM_UNIXTIME(created_at )) AS date';
                break;
            case 'h':
                $select = 'DATE_FORMAT(FROM_UNIXTIME(created_at), "%Y-%m-%d %H:00:00") AS date';
                break;
            case 'm':
                $select = 'DATE_FORMAT(FROM_UNIXTIME(created_at), "%Y-%m-%d %H:%i:00") AS date';
                break;
        }
        $where = ' ';
        if ($from != 'null' && $to != 'null') {
            $where = ' WHERE created_at BETWEEN ' . $from / 1000 . ' AND ' . $to / 1000 . ' ';
        }
        $result = $this->simple_query("SELECT " . $select . ", COUNT(id) AS count FROM tweets" . $where . "GROUP BY 1");
        return $result;
    }

    function getTopTweetsFromVenue($venueId, $limit) {
        $result = $this->simple_query("SELECT tweet_id, text, retweeted_count, has_coordinates.user_id AS user
                                       FROM has_coordinates
                                       JOIN tweets ON tweet_id = id
                                       WHERE coordinate_id = " . $venueId . "
                                       ORDER BY created_at DESC
                                       LIMIT 0, " . $limit);

        return $result;
    }

    function getCount($date) {
        $result = $this->simple_query("SELECT DATE(FROM_UNIXTIME(created_at)) AS date, HOUR(FROM_UNIXTIME(created_at)) AS hour, COUNT(id) AS count
                                       FROM tweets
                                       WHERE 'count' IS NOT NULL 
                                       AND DATE(FROM_UNIXTIME(created_at)) = '" . $date . "'
                                       GROUP BY 1, 2");
        return $result;
    }

    function insertTweetCount($date, $count) {
        $this->simple_query("INSERT INTO tweets_count VALUES (" . $date . ", " . $count . ")");
    }
}