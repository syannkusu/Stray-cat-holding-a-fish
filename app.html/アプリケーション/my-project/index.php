http://localhost/my_project/index.php
<?php
$host = "localhost";
$user = "root";
$pass = "root"; // MAMPのデフォルトパスワード
$dbname = "test_db"; // あなたが作ったデータベース名

try {
    // PDOという仕組みを使って接続します
    $dsn = "mysql:host={$host};dbname={$dbname};charset=utf8mb4";
    $pdo = new PDO($dsn, $user, $pass);
    
    echo "接続に成功しました！";
} catch (PDOException $e) {
    echo "接続エラー: " . $e->getMessage();
}
?>
