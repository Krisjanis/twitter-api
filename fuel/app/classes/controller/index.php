<?php
/**
 * @package  app
 * @extends  Controller_Public
 */
class Controller_Index extends Controller_Public
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
        $data['totalUsersCount'] = Model_User_Account::count();
        $data['totalTweetCount'] = $this->getTotalTweetsCount($data['tweetCountByDay']);
        $this->template->content = View::forge('index/index', $data);
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
        $this->template->content = View::forge('index/404');
    }

    /**
     * Get total tweets count
     *
     * @param array $days
     * @return int
     */
    public function getTotalTweetsCount($days = null) {
        if (!empty($days)) {
            $count = 0;
            foreach ($days as $day) {
                $count += $day['count'];
            }
            return $count;
        }
    }

}
