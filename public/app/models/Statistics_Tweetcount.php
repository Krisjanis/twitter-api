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
     * Get last week tweet count
     * @return int
     */
    function getTweetCountByTwoWeeks()
    {
        $to = date('Y-m-d', strtotime(date('Y-m-d') . '-1 day'));
        $from = date('Y-m-d', strtotime($to . '-1 week +1 day'));
        $toOld = date('Y-m-d', strtotime($from . '-1 day'));
        $fromOld = date('Y-m-d', strtotime($toOld . '-1 week'));
        $new = $this->select("DATE(FROM_UNIXTIME(time)) AS date, SUM(count) as count_new", "DATE(FROM_UNIXTIME(time)) BETWEEN '" . $from . "' AND '" . $to . "' GROUP BY 1");
        $old = $this->select("DATE(FROM_UNIXTIME(time)) AS date, SUM(count) as count_old", "DATE(FROM_UNIXTIME(time)) BETWEEN '" . $fromOld . "' AND '" . $toOld . "' GROUP BY 1");
        foreach ($old as $old_key => $old_day) {
            foreach ($new as $new_key => $new_day) {
                if ($old_key == $new_key) {
                    array_push($new[$new_key], $old_day['count_old']);
                }
            }
        }
        return $new;
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