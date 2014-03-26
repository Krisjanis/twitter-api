<?php
/**
 * Admin controller
 *
 * @package  app
 * @extends  Controller_Public
 */
class Controller_Admin extends Controller_Public
{
    /**
     * Checks if user has access to admin panel
      */
    public function before()
    {
        parent::before();

        if (!Auth::has_access('admin.index')) {
            $this->template->customClass = 'page-404';
            $this->template->content = View::forge('welcome/404');
            echo $this->template->render();
            die;
        }
    }

    /**
     * Admin panel
     */
    public function action_index()
    {
        // show shit
    }
}