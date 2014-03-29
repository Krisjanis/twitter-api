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
            var_dump(Input::post());
            if (Auth::login())
            {
                Response::redirect('admin/index');
            }
            else
            {
                $data['username'] = Input::post('username');
                $data['login_error'] = 'Wrong username/password combo. Try again';
            }
        }
        $this->template->customClass = 'login';
        $this->template->content = View::forge('admin/login', $data);
    }
}