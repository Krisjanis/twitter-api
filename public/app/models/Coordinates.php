<?php
class Coordinates extends Model
{
    function getTopCoordinates($venuesCount, $maxTopVenues)
    {
        if ($venuesCount == 'all') {
            $limit = '';
        } elseif ($venuesCount < $maxTopVenues) {
            $limit = ' LIMIT 0, ' . $maxTopVenues;
        } else {
            $limit = ' LIMIT 0, ' . $venuesCount;
        }
        $result = $this->simple_query('SELECT * FROM coordinates ORDER BY coordinates.count DESC' . $limit);
        $coordinates = array();
        $key = 1;
        foreach ($result as $row) {
            $points = explode(',', $row['coordinates']);
            $coordinates[$key] = array('0' => $points[0],
                                       '1' => $points[1],
                                       '2' => $row['id'],
                                       '3' => $row['count']
                                      );
            $key++;
        }
        return $coordinates;
    }
}