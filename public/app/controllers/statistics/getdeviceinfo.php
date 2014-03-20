<?php
function _getdeviceinfo () {
    $id = $_GET['id'];
    $limit = $_GET['limit'];
    $offset = $_GET['offset'];
    $sources = new Statistics_Source();
    $devices = $sources->getTopSources(0, 50, 'total');

    $values = array();
    foreach($devices as $data) {
        $value = array('name' => strip_tags($data['source']),
                       'value' => $data['count']);
        array_push($values, $value);
    }

    print_r(json_encode(array('values' => $values)));
}