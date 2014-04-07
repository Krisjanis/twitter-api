<?php

use Orm\Model;

class Model_Coordinates extends Model
{
    protected static $_properties = array(
        'id',
        'coordinates',
        'type',
        'count'
    );

    protected static $_conditions = array(
        'order_by' => array('count' => 'desc')
    );

    public static function getTopCoordinates($limit) {
        $result = parent::find('all', array('limit' => $limit));
        $key = 1;
        foreach ($result as $row) {
            $points = explode(',', $row['coordinates']);
            $coordinates[$key] = array(
                '0' => $points[0],
                '1' => $points[1],
                '2' => $row['id'],
                '3' => $row['count']
            );
            $key++;
        }
        return $coordinates;
    }
}