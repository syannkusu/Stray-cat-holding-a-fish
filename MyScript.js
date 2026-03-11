window.onload = displayItems;
// JavaScriptのコード
window.location.href = 'time.html';

function addItem(rate) {
    const name = document.getElementById("name").value;
    const file = document.getElementById("camera").files[0];

    if (!name) return alert("商品名を入力してください");

    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => saveData(name, rate, e.target.result);
        reader.readAsDataURL(file);
    } else {
        saveData(name, rate, "");
    }
}

function saveData(name, rate, imageData) {
    const items = JSON.parse(localStorage.getItem("items")) || [];
    items.push({ name, rate, image: imageData });
    localStorage.setItem("items", JSON.stringify(items));
    
    document.getElementById("name").value = "";
    document.getElementById("camera").value = "";
    displayItems();
}

function displayItems() {
    const listArea = document.getElementById("list-area");
    if (!listArea) return;

    const items = JSON.parse(localStorage.getItem("items")) || [];
    listArea.innerHTML = items.reverse().map((item, index) => `
        <div style="border:1px solid #ccc; margin:10px 0; padding:10px; border-radius:8px;">
            <p><strong>${item.name}</strong> (評価: ${item.rate})</p>
            ${item.image ? `<img src="${item.image}" style="width:100%; max-width:200px;">` : ""}
            <button onclick="deleteItem(${items.length - 1 - index})">削除</button>
        </div>
    `).join("");
}

function deleteItem(index) {
    const items = JSON.parse(localStorage.getItem("items")) || [];
    items.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(items));
    displayItems();
}
