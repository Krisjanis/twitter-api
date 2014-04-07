<?php

use Orm\Model;

class Model_Statistics_Source extends Model
{
    protected static $_table_name = 'statistics_sources';
    protected static $_primary_key = array('source');
    protected static $_properties = array(
        'source',
        'total_count',
        'last_month_count',
        'last_week_count',
        'yesterday_count',
    );
}