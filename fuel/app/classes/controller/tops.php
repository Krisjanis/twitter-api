<?php
/**
 * @package  app
 * @extends  Controller_Public
 */
class Controller_Tops extends Controller_Public
{

    /**
     * Tops page
     *
     * @access  public
     * @return  Response
     */
    public function action_index()
    {
        $data['baseUrl'] = \Uri::base();
        $this->template->content = View::forge('tops/index', $data);
    }

    /**
     * Get top user mentions
     *
     * @param int $from
     * @param int $to
     * @param string $period
     * @return string
     */
    public function action_ajaxGetMentions($from = 0, $to = 20, $period = 'day')
    {
        $view = \View::forge('tops/mentions');
        $view->set('users', \Model_Statistics_Mention::getTopMentions($from, $to, $period));
        return $view->render();
    }

    /**
     * Get top hashtags
     *
     * @param int $from
     * @param int $to
     * @return string
     */
    public function action_ajaxGetHashTags($from = 0, $to = 20)
    {
        $view = \View::forge('tops/hashtags');
        $view->set('hashtags', \Model_HasHashtag::getTopHashtags($to));
        return $view->render();
    }

    /**
     * Render top sources table
     * @param int $from
     * @param int $to
     * @param string $period
     */
    public function action_ajaxGetSources($from, $to, $period)
    {
        $data['sources'] = Model_Statistics_Source::getTopSources($from, $to, $period);
        return render('tops/sources', $data, false);
    }

    /**
     * Render top retweets table
     * @param int $from
     * @param int $to
     * @param string $period
     */
    public function action_ajaxGetRetweets($from, $to, $period)
    {
        $data['retweets'] = Model_Statistics_Retweet::getTopRetweets($from, $to, $period);
        return render('tops/retweets', $data, false);
    }
}
