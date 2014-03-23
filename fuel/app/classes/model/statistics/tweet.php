<?php

use Orm\Model;

class Model_Statistics_Tweet extends Model
{
    /**
     * Get last month tweet count
     * @return int count
     */
    public static function getLastMonthTweetCount()
    {
        return DB::select(DB::expr('SUM(count) as count'))
                ->from('tweets_count')
                ->execute()
                ->get('count');
    }

    /**
     * Get total tweet count
     * @return int count
     */
    public static function getTotalTweetCount()
    {
        $to = date('Y-m-d', strtotime(date('Y-m-d') . '-1 day'));
        $from = date('Y-m-d', strtotime($to . '-1 month +1 day'));
        return DB::select(DB::expr('SUM(count) as count'))
                ->from('tweets_count')
                ->where(DB::expr('DATE(FROM_UNIXTIME(time))'), 'between', array($from, $to))
                ->execute()
                ->get('count');
    }

    /**
     * Get day with most tweets count
     * @return array date and count
     */
    public static function getMaxTweets()
    {
        $results = DB::select(DB::expr('DATE(FROM_UNIXTIME(time)) AS date'), DB::expr('SUM(count) AS count'))
                ->from('tweets_count')
                ->group_by('date')
                ->order_by('count','desc')
                ->limit(1)
                ->execute();
        return array(
            'date'  => $results->get('date'),
            'count' => $results->get('count')
        );
    }

    /**
     * Get tweet count of this week and previous week
     * @return array
     */
    public static function getTweetCountByTwoWeeks()
    {
        $to = date('Y-m-d', strtotime(date('Y-m-d') . '-1 day'));
        $from = date('Y-m-d', strtotime($to . '-1 week +1 day'));
        $toOld = date('Y-m-d', strtotime($from . '-1 day'));
        $fromOld = date('Y-m-d', strtotime($toOld . '-1 week +1 day'));

        $new = DB::select(DB::expr('DATE(FROM_UNIXTIME(time)) AS date'), DB::expr('SUM(count) as count'))
               ->from('tweets_count')
               ->where(DB::expr('DATE(FROM_UNIXTIME(time))'), 'between', array($from, $to))
               ->group_by('date')
               ->execute();
        $old = DB::select(DB::expr('DATE(FROM_UNIXTIME(time)) AS date'), DB::expr('SUM(count) as count'))
               ->from('tweets_count')
               ->where(DB::expr('DATE(FROM_UNIXTIME(time))'), 'between', array($fromOld, $toOld))
               ->group_by('date')
               ->execute();

        $result = array();
        foreach ($new as $newDay) {
            $day = date('l', strtotime($newDay['date']));
            $newCount = $newDay['count'];
            foreach ($old as $oldDay) {
                if ($day == date('l', strtotime($oldDay['date']))) {
                    array_push($result, array(
                        'day' => $day,
                        'count_this' => $newCount,
                        'count_previous' => $oldDay['count']
                    ));
                }
            }
        }
        return $result;
    }

    public static function getTweetCountByDay()
    {
        //$result = $this->select("DATE(FROM_UNIXTIME(time)) AS date, SUM(count) as count", "'count' IS NOT NULL GROUP BY 1");
        $data = DB::select(DB::expr('DATE(FROM_UNIXTIME(time)) AS date'), DB::expr('SUM(count) as count'))
                ->from('tweets_count')
                ->group_by('date')
                ->execute();
        $result = array();
        foreach ($data as $row) {
            array_push($result, $row);
        }
        return $result;
    }
}