<?php

use Orm\Model;

class Model_Words extends Model
{
    protected static $_table_name = 'words_count';
    protected static $_primary_key = array('date');
    protected static $_properties = array(
        'date',
        'words',
    );

    /**
     * Get top words from all days
     * @return Model_Words
     */
    public static function getWords($limit = 40)
    {
        $data = parent::find('all', array(
            'order_by' => array('date' => 'desc'),
            'limit' => $limit
        ));
        return array_reverse($data);
    }
}