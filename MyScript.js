<script>
    // ページを開いた瞬間に保存済みのリストを表示
    window.onload = displayItems;

    function addItem(rate) {
        let name = document.getElementById("name").value;
        let fileInput = document.getElementById("camera"); 
        let file = fileInput.files[0];

        if (!name) {
            alert("商品名を入力してください");
            return;
        }

        if (file) {
            let reader = new FileReader();
            reader.onload = function (e) {
                saveData(name, rate, e.target.result); 
            };
            reader.readAsDataURL(file);
        } else {
            saveData(name, rate, "");
        }
    }

    function saveData(name, rate, imageData) {
        let items = JSON.parse(localStorage.getItem("items")) || [];
        items.push({ name: name, rate: rate, image: imageData });
        localStorage.setItem("items", JSON.stringify(items));

        document.getElementById("name").value = "";
        document.getElementById("camera").value = "";
        displayItems();
        alert("保存しました！");
    }

    function displayItems() {
        let items = JSON.parse(localStorage.getItem("items")) || [];
        let listArea = document.getElementById("list-area");
        
        if (!listArea) return;
        listArea.innerHTML = ""; // 画面を一度リセット

        items.forEach((item) => {
            let html = `
                <div style="border:1px solid #ccc; margin:10px 0; padding:10px; border-radius:8px;">
                    <p><strong>商品名:</strong> ${item.name} / <strong>評価:</strong> ${item.rate}</p>
                    ${item.image ? `<img src="${item.image}" style="width:100%; max-width:200px; display:block; margin-top:5px;">` : ""}
                </div>
            `;
            listArea.insertAdjacentHTML("beforeend", html);
        });
    }
    function deleteItem(index) {
    let items = JSON.parse(localStorage.getItem("items")) || [];
    items.splice(index, 1); // 指定した要素を削除
    localStorage.setItem("items", JSON.stringify(items));
    displayItems();
    }
items.reverse().forEach(...)
</script>
function addItem(rate){
    let name = document.getElementById("name").value;
    if(!name){
        alert("商品名を入力");
        return;
    }
    
    // 登録が終わったと仮定して移動
    alert("登録完了！ログイン画面へ移動します");
    location.href = "login.html"; 
}
/* 画面全体を中央寄せにする設定 */
function loginCheck() {
    // 入力値を取得
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    // 簡単なチェック（例：空欄でないか）
    if (user !== "" && pass !== "") {
        alert("ログイン成功！次のページへ移動します。");
        
        // 別の画面（URL）に移動するコード
        window.location.href = "home.html"; 
    } else {
        alert("ユーザー名とパスワードを入力してください。");
    }
}
// HTML側に onclick="goToRegister()" を追加して使います
function goToRegister() {
    window.location.href = "register.html"; // 登録画面のファイル名
}
