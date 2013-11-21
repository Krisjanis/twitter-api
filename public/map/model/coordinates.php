<?php
class Model_Coordinates {

    public function getCoordinates($venuesCount)
    {
        $con = mysql_connect("localhost","root","root");
        mysql_select_db('twitter3', $con);

        $data = mysql_query("SELECT * FROM  `coordinates` ORDER BY  `coordinates`.`count` DESC LIMIT 0," . $venuesCount);
        

        $coordinates = array();
        $key = 1;
        while($row = mysql_fetch_array($data)) {
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