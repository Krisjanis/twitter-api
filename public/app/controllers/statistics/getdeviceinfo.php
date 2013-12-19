<?php
function _getdeviceinfo () {
    $tweets = new Tweet();
    $id = $_GET['id'];
    $limit = $_GET['limit'];
    $offset = $_GET['offset'];
    $devices = $tweets->getSource(50);

    $values = array();
    foreach($devices as $data) {
        $value = array('name' => $data['source'],'value' => $data['count']);
        array_push($values, $value);
    }

    print_r(json_encode(array('values' => $values,
                        )));
}