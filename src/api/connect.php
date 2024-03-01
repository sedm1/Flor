<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE'); 

$connect = new mysqli("127.0.0.1", "root", "", "store");
if (!$connect){
    echo "Подключениие к Бд не сделано";
    die();   
};
?>