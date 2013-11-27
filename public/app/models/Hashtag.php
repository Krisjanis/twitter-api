<?php
class Hashtag extends Model
{
    function Hashtag()
    {
        parent::__construct('id', 'hashtags', 'getdbh');

        $this->rs['id'] = '';
        $this->rs['hashtag'] = '';
    }

    /**
     * @param $count - the count of result rows
     *
     * @return mixed
     */
    function getTopHashtags($count)
    {
        $result = $this->simple_query("SELECT hashtag_id AS id, COUNT( hashtag_id ) AS count, hashtag
                                        FROM has_hashtags
                                        JOIN hashtags ON id = hashtag_id
                                        GROUP BY 1
                                        ORDER BY count DESC
                                        LIMIT 0, " . $count);

        return $result;
    }

}