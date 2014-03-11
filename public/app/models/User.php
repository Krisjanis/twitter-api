<?php
class User extends Model
{
    function User()
    {
        parent::__construct('id','users','getdbh');
        //list of table fields below, need not contain all fields in table.
        $this->rs['id'] = '';
    }

    function getTotalUserCount()
    {
        $result = $this->select("COUNT(id) as count");
        return $result[0]["count"];
    }

    function getTopUserMentions($count)
    {
        $result = $this->simple_query("SELECT user_id, COUNT( user_id ) AS count, screen_name
                                        FROM user_mentions
                                        JOIN users ON user_id = id
                                        GROUP BY 1
                                        ORDER BY count DESC
                                        LIMIT 0, " . $count);

        return $result;
    }

    function getUsersTweetsCount()
    {
        $result = $this->simple_query("SELECT statuses_count AS tweets, COUNT(*) AS users
                                        FROM users
                                        GROUP BY statuses_count
                                        ORDER BY statuses_count ASC");

        return $result;
    }

    function getUsersTweetsCountLimit($from, $to)
    {
        $result = $this->simple_query("SELECT statuses_count AS tweets, COUNT(*) AS users
                                        FROM users
                                        WHERE statuses_count > " . $from . " AND statuses_count < " . $to . "
                                        GROUP BY statuses_count
                                        ORDER BY statuses_count ASC");

        return $result;
    }

    function getTopUsersFromVenue($venueId, $limit = 10, $from) {
        $result = $this->simple_query("SELECT has_coordinates.user_id, screen_name, count(screen_name) as count, image_url
                                       FROM has_coordinates
                                       JOIN users ON user_id = id
                                       JOIN user_profile ON has_coordinates.user_id = user_profile.user_id
                                       WHERE coordinate_id = " . $venueId . "
                                       GROUP BY 2
                                       ORDER BY count DESC
                                       LIMIT " . $from . "," . $limit );

        return $result;
    }

    function getVenueUsersCount($venueId) {
        $result = $this->simple_query("SELECT COUNT(DISTINCT user_id) as count FROM has_coordinates WHERE coordinate_id = " . $venueId);
        return $result;
    }
}