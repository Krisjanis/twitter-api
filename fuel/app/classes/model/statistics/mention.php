<?php

use Orm\Model;

class Model_Statistics_Mention extends Model
{
    protected static $_table_name = 'statistics_user_mentions';
    protected static $_primary_key = array('');
    protected static $_properties = array(
        'user_id',
        'screen_name',
        'total_mentions',
        'last_month_mentions',
        'last_week_mentions',
        'yesterday_mentions',
    );
}