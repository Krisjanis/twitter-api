<?php

use Orm\Model;

class Model_Statistics_Mention extends Model
{
    protected static $_table_name = 'statistics_user_mentions';
    protected static $_primary_key = array('');
    protected static $_properties = array(
        'user_id',
        'screen_name',
        'total_mentions',
        'last_month_mentions',
        'last_week_mentions',
        'yesterday_mentions',
    );

    /**
     * Get top user mentions
     *
     * @param date $from
     * @param date $to
     * @return array
     */
    public static function getTopMentions($from = 0, $to = 20, $period = 'day')
    {
        switch ($period) {
            case 'day':
                $data = 'yesterday_mentions';
                break;
            case 'week':
                $data = 'last_week_mentions';
                break;
            case 'month':
                $data = 'last_month_mentions';
                break;
            case 'total':
                $data = 'total_mentions';
                break;
        }
        $results = DB::select('user_id', 'screen_name', DB::expr($data . ' AS count'))
                ->from('statistics_user_mentions')
                ->order_by($data, 'desc')
                ->offset($from)
                ->limit($to - $from)
                ->execute();

        $result = array();
        foreach($results as $key => $user) {
            $result[$key]['screen_name'] = $user['screen_name'];
            $result[$key]['count'] = $user['count'];
        }

        return $result;
    }
}