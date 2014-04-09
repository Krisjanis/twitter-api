<?php
/**
 * @package  app
 * @extends  Controller_Public
 */
class Controller_Statistics extends Controller_Public
{
    /**
     * Show statictics main page
     */
    public function action_index()
    {
        $this->template->content = View::forge('statistics/index');
    }

    /**
     * Show top words in each day
     */
    public function action_words()
    {
        $data['words'] = Model_Words::getWords();
        $data['usedWords'] = Config::get('streaming_used_words');
        $this->template->content = View::forge('statistics/words', $data);
    }
}
