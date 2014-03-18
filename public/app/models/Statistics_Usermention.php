<?php
class Statistics_Usermention extends Model
{
    /**
     * Get top user mentions
     * @param date $from
     * @param date $to
     * @return array
     */
    function getTopMentions($from = 0, $to = 20, $period = 'day')
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
        $result = $this->simple_query("SELECT user_id, screen_name, " . $data . " AS count
                                       FROM statistics_user_mentions
                                       ORDER BY " . $data . " DESC
                                       LIMIT " . $from . ", " . $to);
        return $result;
    }
}