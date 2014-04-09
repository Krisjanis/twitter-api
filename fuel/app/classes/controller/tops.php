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

    public function action_ajaxGetMentions()
    {
        return 'test';
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
}
