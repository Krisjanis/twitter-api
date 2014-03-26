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
}