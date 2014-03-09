<?php
class Words extends Model
{
    
    function getEachDayTopWords()
    {
        $result = $this->simple_query("SELECT DATE(FROM_UNIXTIME(date)) as date, words
                                       FROM words_count
                                       ORDER BY DATE(FROM_UNIXTIME(date)) ASC");

        return $result;
    }

    function updateWords()
    {
        
    }

}