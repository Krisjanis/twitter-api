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
}