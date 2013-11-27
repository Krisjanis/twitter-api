<?php
require('kissmvc_core.php');

//===============================================================
// Model/ORM
//===============================================================
class Model extends KISS_Model
{

    function simple_query($query,$pdo_fetch_mode=PDO::FETCH_ASSOC) {
        $dbh=$this->getdbh();
        $stmt = $dbh->query($query);
        return $stmt->fetchAll($pdo_fetch_mode);
    }
}

//===============================================================
// Controller
//===============================================================
class Controller extends KISS_Controller {
}

//===============================================================
// View
//===============================================================
class View extends KISS_View
{
    function formatNumber($number) {
        return number_format($number, 0, ',', ' ');
    }
}