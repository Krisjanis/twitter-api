<?php
function _index($msg='Coordinates!') {
  $view = new View(APP_PATH.'views/layout.php');
  $view->set('msg',$msg);
  $view->dump();
}