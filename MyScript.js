<script>
    function addItem(rate){
        // Lを小文字に修正
        let name = document.getElementById("name").value;
        let file = document.getElementById("camera").files[0];
        
        if(!name){
            alert("商品名を入力");
            return;
        }
        
        // この後に、選んだ「◎⚪︎△✖️」の評価(rate)を保存する処理などを続けます
        console.log("商品名:", name);
        console.log("評価:", rate);
    }
</script>
