<?php
class Statistics_Usermention extends Model
{
    /**
     * Get top user mentions
     * @param date $from
     * @param date $to
     * @return array
     */
    function getTopMentionsTotal($from = 0, $to = 20)
    {
        $result = $this->simple_query("SELECT user_id, screen_name, total_mentions AS count
                                       FROM statistics_user_mentions
                                       ORDER BY total_mentions DESC
                                       LIMIT " . $from . ", " . $to);
        return $result;
    }
}