<?php
class Statistics_Source extends Model
{
    /**
     * Get top tweet sources
     * @param date $from
     * @param date $to
     * @return array
     */
    function getTopSources($from = 0, $to = 20, $period = 'day')
    {
        switch ($period) {
            case 'day':
                $data = 'yesterday_count';
                break;
            case 'week':
                $data = 'last_week_count';
                break;
            case 'month':
                $data = 'last_month_count';
                break;
            case 'total':
                $data = 'total_count';
                break;
        }
        $result = $this->simple_query("SELECT source, " . $data . " AS count
                                       FROM statistics_sources
                                       ORDER BY " . $data . " DESC
                                       LIMIT " . $from . ", " . $to);
        return $result;
    }
}