<?php
include 'connect.php';


$email = $_POST['email'];
$phone = $_POST['phone'];
$pass = md5(md5($_POST['pass']));

$results = array();

$sql = "INSERT INTO `users`( `email`, `phone`, `password`) VALUES ('$email', '$phone', '$pass')";
$res = $connect->query($sql);
if ($res instanceof mysqli_result){
    $results['status'] = 'True';
} else{
    $results['status'] = 'False';
}

echo json_encode($results);

$connect -> close();
die;