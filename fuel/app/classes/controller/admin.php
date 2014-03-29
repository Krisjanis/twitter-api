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
     * Works before every admin function
      */
    public function before()
    {
        parent::before();

        // Check if has access
        if (!Auth::has_access('admin.index')) {
            $this->template->customClass = 'page-404';
            $this->template->content = View::forge('index/404');
            echo $this->template->render();
            die;
        }

        // Set admin panel template
        $this->template = View::forge('admin/template');
    }

    /**
     * Admin panel
     */
    public function action_index()
    {
        // show shit
    }
}