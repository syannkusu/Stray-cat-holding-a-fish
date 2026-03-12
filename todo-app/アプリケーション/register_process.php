<?php
// 1. データベース接続設定 (自分の環境に合わせて書き換えてください)
$host = 'localhost';
$dbname = 'your_db_name';
$user = 'your_username';
$pass = 'your_password';

try {
    // [PDO](https://www.php.net/manual/ja/book.pdo.php) を使用してデータベースに接続
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // 2. フォームデータの受け取り
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    // 3. パスワードのハッシュ化 (セキュリティ上、そのまま保存するのはNG)
    // [password_hash](https://www.php.net) を使用
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // 4. SQLの準備 (SQLインジェクション対策としてプリペアドステートメントを使用)
    $sql = "INSERT INTO users (username, email, password) VALUES (:username, :email, :password)";
    $stmt = $pdo->prepare($sql);

    // 5. データの実行
    $params = [
        ':username' => $username,
        ':email' => $email,
        ':password' => $hashed_password
    ];
    $stmt->execute($params);

    echo "アカウントの作成が完了しました！";
    echo '<br><a href="merchandise.html">ログイン画面へ</a>';

} catch (PDOException $e) {
    // メールアドレスの重複などはここでキャッチ
    if ($e->getCode() == 23000) {
        echo "このメールアドレスは既に登録されています。";
    } else {
        echo "エラーが発生しました: " . $e->getMessage();
    }
}
?>

