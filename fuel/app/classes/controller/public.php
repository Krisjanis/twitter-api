<?php
/**
 * Admin controller
 *
 * @package  app
 * @extends  Controller_Template
 */
class Controller_Public extends Controller_Template
{
    /**
     * Returns users id
     */
    protected function getUserId($auth = null)
    {
        if ($auth) {
            $userId = $auth->get_user_id();
            return $userId[1];
        }
    }

    /**
     * Returns users group id
     */
    protected function getUserGroup($auth = null)
    {
        if ($auth) {
            $user_group = $auth->get_groups();
            return $user_group[0][1];
        }
    }

    /**
     * Sets flash success message
     */
    protected function setSuccessMsg($message)
    {
        \Session::set_flash('success', $message);
    }

    /**
     * Sets flash error message
     */
    protected function setErrorMsg($message)
    {
        \Session::set_flash('error', $message);
    }

    /**
     * Sets flash notice message
     */
    protected function setNoticeMsg($message)
    {
        $messages = \Session::get_flash('notice');
        if ($messages !== null) {
            array_push($messages, $message);
            \Session::set_flash('notice', $messages);
        } else {
            \Session::set_flash('notice', array($message));
        }
    }
}