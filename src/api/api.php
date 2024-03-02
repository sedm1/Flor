<?php 
include 'connect.php';
$action = '';

if (isset($_GET['action'])) {
    $action = $_GET['action'];
}
//Получение всех продуктов с БД
if ($action == 'GetAllProducts'){
    $AllProducts = [];
    $sql = 'SELECT * from `products`';
    $products = $connect->query($sql);
    if ($products->num_rows > 0) {
        while ($product = $products->fetch_assoc()) {
            array_push( $AllProducts, $product);
        }
    } else{
        echo "Данных не найдено";
    };
    echo json_encode($AllProducts, JSON_UNESCAPED_UNICODE);
    
};
$connect -> close();
die;