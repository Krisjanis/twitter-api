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

        if (\Input::post())
        {
            if (\Auth::login())
            {
                \Response::redirect('admin/index');
            }
            else
            {
                $data['username'] = \Input::post('username');
                $this->setErrorMsg('Nepareiza parole un/vai lietotājvārds');
            }
        }
        $this->template->customClass = 'login';
        $this->template->content = \View::forge('admin/login', $data);
    }
}
