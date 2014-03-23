<?php
/**
 * @package  app
 * @extends  Controller_Template
 */
class Controller_Welcome extends Controller_Template
{

    /**
     * Main page
     *
     * @access  public
     * @return  Response
     */
    public function action_index()
    {
        $data['totalTweetCount'] = Model_Statistics_Tweet::getTotalTweetCount();
        $data['lastMonthTweetCount'] = Model_Statistics_Tweet::getLastMonthTweetCount();
        $data['maxTweets'] = Model_Statistics_Tweet::getMaxTweets();
        $data['tweetCountByTwoWeeks'] = Model_Statistics_Tweet::getTweetCountByTwoWeeks();
        $data['tweetCountByDay'] = Model_Statistics_Tweet::getTweetCountByDay();
        $this->template->content = View::forge('welcome/index', $data);
    }

    /**
     * The 404 action for the application.
     *
     * @access  public
     * @return  Response
     */
    public function action_404()
    {
        $this->template->customClass = 'page-404';
        $this->template->content = View::forge('welcome/404');
    }

}
