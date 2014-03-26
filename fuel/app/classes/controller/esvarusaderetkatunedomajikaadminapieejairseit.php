<?php
/**
 * Admin controller
 *
 * @package  app
 * @extends  Controller_Public
 */
class Controller_EsVaruSaderetKaTuNedomajiKaAdminaPieejaIrSeit extends Controller_Public
{
    public function action_index()
    {
        $data = array();

        if (Input::post())
        {
            if (Auth::login())
            {
            	die('die ir labs');
                //Response::redirect('admin/index');
            }
            else
            {
                $data['username'] = Input::post('username');
                $data['login_error'] = 'Wrong username/password combo. Try again';
            }
        }

        echo View::forge('admin/login', $data);
    }
}