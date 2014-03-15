<?php
class Statistics_Source extends Model
{
    /**
     * Get top tweet sources
     * @param date $from
     * @param date $to
     * @return array
     */
    function getTopSourcesTotal($from = 0, $to = 20)
    {
        $result = $this->simple_query("SELECT source, total_count AS count
                                       FROM statistics_sources
                                       ORDER BY total_count DESC
                                       LIMIT " . $from . ", " . $to);
        return $result;
    }
}