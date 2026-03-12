<?php
session_start(); // セッション開始（ログイン状態を記録するために必要）

// フォームから送信されたデータを受け取る
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

// 本来はデータベースで照合しますが、今回はテスト用に固定値で判定します
$test_email = 'example@mail.com';
$test_pass = 'password123';

if ($email === $test_email && $password === $test_pass) {
    // 認証成功：セッションにログイン情報を保存
    $_SESSION['user_login'] = true;
    
    // 成功ページ（time.html）へリダイレクト
    header('Location: time.html');
    exit;
} else {
    // 認証失敗：エラーメッセージを出してログイン画面に戻す
    echo "メールアドレスまたはパスワードが間違っています。";
    echo "<br><a href='index.html'>戻る</a>";
}
?>
