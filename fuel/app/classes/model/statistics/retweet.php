<?php

use Orm\Model;

class Model_Statistics_Retweet extends Model
{
    protected static $_table_name = 'statistics_retweets';
    protected static $_primary_key = array('tweet_id');
    protected static $_properties = array(
        'tweet_id',
        'total_count',
        'last_month_count',
        'last_week_count',
        'yesterday_count',
    );
}