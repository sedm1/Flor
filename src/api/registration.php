<?php
include 'connect.php';


$email = $_POST['email'];
$phone = $_POST['phone'];
$pass = md5(md5($_POST['pass']));

$results = array();


$presql = "SELECT * FROM `users` WHERE `email` = '$email'";
$preres = $connect->query($presql);
if($preres->num_rows > 0) {
    $results['status'] = 'User Exist - email';
    echo json_encode($results);
    $connect -> close();
    die;

}

$presql = "SELECT * FROM `users` WHERE `phone` = '$phone'";
$preres = $connect->query($presql);
if($preres->num_rows > 0) {
    $results['status'] = 'User Exist - phone';
    echo json_encode($results);
    $connect -> close();
    die;

}


$sql = "INSERT INTO `users`( `email`, `phone`, `password`) VALUES ('$email', '$phone', '$pass')";
$res = $connect->query($sql);
$resId = mysqli_insert_id($connect);

$results['status'] = 'True';
$results['id'] = md5($resId);

echo json_encode($results);
$connect -> close();
die;