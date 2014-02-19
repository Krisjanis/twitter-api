<?php
//===============================================
// Debug
//===============================================
ini_set('display_errors','On');
error_reporting(E_ALL);

//===============================================
// mod_rewrite
//===============================================
//Please configure via .htaccess or httpd.conf

//===============================================
// Madatory KISSMVC Settings (please configure)
//===============================================
require('config.php');
define('WEB_FOLDER',$CONFIG['web_folder']);
define('BASE_URL','http://'.$_SERVER['HTTP_HOST'].WEB_FOLDER);
define('APP_PATH','app/');
define('CSS_PATH',BASE_URL.'css/');
define('IMG_PATH',BASE_URL.'img/');
define('JS_PATH',BASE_URL.'js/');


//===============================================
// Other Settings
//===============================================
$GLOBALS['sitename']='Tvitstat';

//===============================================
// Includes
//===============================================
require('kissmvc.php');

//===============================================
// Session
//===============================================
/*
session_start();
*/
//===============================================
// Uncaught Exception Handling
//===============================================s
/*
set_exception_handler('uncaught_exception_handler');

function uncaught_exception_handler($e) {
  ob_end_clean(); //dump out remaining buffered text
  $vars['message']=$e;
  die(View::do_fetch(APP_PATH.'errors/exception_uncaught.php',$vars));
}

function custom_error($msg='') {
  $vars['msg']=$msg;
  die(View::do_fetch(APP_PATH.'errors/custom_error.php',$vars));
}
*/

//===============================================
// Database
//===============================================
function getdbh() {
  if (!isset($GLOBALS['dbh']))
    try {
	require('config.php');
      //$GLOBALS['dbh'] = new PDO('sqlite:'.APP_PATH.'db/kissmvc.sqlite');
        $options = array(
            PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
        );
      $GLOBALS['dbh'] = new PDO('mysql:host=' . $CONFIG['db_host'] . ';dbname=' . $CONFIG['db_table'], $CONFIG['username'], $CONFIG['password'], $options);

    } catch (PDOException $e) {
      die('Connection failed: '.$e->getMessage());
    }
  return $GLOBALS['dbh'];
}

//===============================================
// Autoloading for Business Classes
//===============================================
function __autoload($classname) {
  $a=$classname[0];
  if ($a >= 'A' && $a <='Z')
    require_once(APP_PATH.'models/'.$classname.'.php');
  else
    require_once(APP_PATH.'helpers/'.$classname.'.php');
}

//===============================================
// Start the controller
//===============================================
$controller = new Controller(APP_PATH.'controllers/',WEB_FOLDER,'main','index');
