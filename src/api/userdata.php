<?php
include 'connect.php';

$res = [];

$HashId = $_POST['UserId'];

$sql = "SELECT * FROM `users` WHERE md5(`id`) = '$HashId'";
$results = $connect->query($sql);
$UserData = [];


if ($results->num_rows > 0) {
    while ($result = $results->fetch_assoc()) {
        array_push( $UserData, $result);
    }
} else{
    echo 'Аккаунта не было найдено';
};

echo json_encode($UserData, JSON_UNESCAPED_UNICODE);
$connect -> close();
die;