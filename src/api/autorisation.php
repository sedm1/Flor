<?php
include 'connect.php';
#По-хорошему использовать спец плагины для хэширования, но для тест проекта 2 * md5 - за глаза
$email = $_POST['email'];
$pass = md5(md5($_POST['pass']));

$result = [];

$sql = "SELECT * FROM `users` WHERE `email` = '$email' AND `password` = '$pass'";
$res = $connect->query($sql);

if ($res->num_rows > 0) {
    $result['status'] = '1';
    $id = $res -> fetch_assoc();
    $id = md5($id["id"]);
    $result['id'] = $id;
} else {
    $result['status'] = '0';
}
echo json_encode($result);

$connect -> close();
die;