<?php

include 'connect.php';

$result = [];

$name = isset($_POST['name']) ? $_POST['name'] : '';
$lastname = isset($_POST['lastname']) ? $_POST['lastname'] : '';
$birtday = isset($_POST['birtday']) ? $_POST['birtday'] : '';
$city = isset($_POST['city']) ? $_POST['city'] : '';
$street = isset($_POST['street']) ? $_POST['street'] : '';
$house = isset($_POST['house']) ? $_POST['house'] : '';

$UserHashId = $_POST['UserHashId'];



$sql = "UPDATE `users` 
        SET 
        `name`='$name',
        `lastname`='$lastname',
        `birthday`='$birtday',
        `city`='$city',
        `street`='$street',
        `home`='$house'
        WHERE 
        md5(`id`) = '$UserHashId'
        ";

$res = $connect->query($sql);
$result['status'] = $res ? '1`' : '0';
echo json_encode($result);

$connect -> close();
die;