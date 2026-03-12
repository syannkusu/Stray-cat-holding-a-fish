<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>Time App</title>

<style>

body{
font-family: Arial;
background: linear-gradient(135deg,#4facfe,#00f2fe);
height:100vh;
display:flex;
justify-content:center;
align-items:center;
}

.container{
background:white;
width:340px;
padding:25px;
border-radius:20px;
box-shadow:0 10px 30px rgba(0,0,0,0.3);
}

h1{
text-align:center;
margin-bottom:20px;
}

.timer{
margin-bottom:20px;
}

.timer label{
font-weight:bold;
display:block;
margin-bottom:5px;
}

.time-input{
display:flex;
align-items:center;
}

.time-input input{
width:60px;
font-size:22px;
padding:5px;
text-align:center;
border:1px solid #ccc;
border-radius:5px;
}

.colon{
margin:0 5px;
font-size:22px;
}

.start-btn{
width:100%;
padding:12px;
font-size:18px;
background:#4CAF50;
color:white;
border:none;
border-radius:10px;
cursor:pointer;
}

.slider{
margin-top:25px;
background:#eee;
height:50px;
border-radius:30px;
position:relative;
}

.circle{
width:50px;
height:50px;
background:#4CAF50;
border-radius:50%;
position:absolute;
left:0;
top:0;
display:flex;
justify-content:center;
align-items:center;
color:white;
font-size:20px;
cursor:pointer;
}

.slide-text{
position:absolute;
width:100%;
text-align:center;
line-height:50px;
color:#666;
}

</style>

</head>

<body>

<div class="container">

<h1>Time</h1>

<div class="timer">
<label>目覚ましタイマー</label>
<div class="time-input">
<input id="wakeH" type="number" min="0" max="23">
<div class="colon">:</div>
<input id="wakeM" type="number" min="0" max="59">
</div>
</div>

<div class="timer">
<label>就寝タイマー</label>
<div class="time-input">
<input id="sleepH" type="number">
<div class="colon">:</div>
<input id="sleepM" type="number">
</div>
</div>

<div class="timer">
<label>出発タイマー</label>
<div class="time-input">
<input id="goH" type="number">
<div class="colon">:</div>
<input id="goM" type="number">
</div>
</div>

<div class="timer">
<label>帰宅タイマー</label>
<div class="time-input">
<input id="homeH" type="number">
<div class="colon">:</div>
<input id="homeM" type="number">
</div>
</div>

<button class="start-btn" onclick="startTimer()">タイマー開始</button>

<div class="slider">
<div class="slide-text">→ スライドして停止</div>
<div class="circle" id="circle">▶</div>
</div>

</div>

<script>

let timer;

function startTimer(){

let h = document.getElementById("wakeH").value || 0
let m = document.getElementById("wakeM").value || 0

let seconds = (h*3600)+(m*60)

alert("タイマー開始")

timer=setTimeout(()=>{
alert("時間です！")
},seconds*1000)

}

let circle=document.getElementById("circle")

circle.onmousedown=function(){

document.onmousemove=function(e){

let x=e.clientX-100

if(x<0)x=0
if(x>240)x=240

circle.style.left=x+"px"

}

document.onmouseup=function(){

document.onmousemove=null

if(parseInt(circle.style.left)>200){

clearTimeout(timer)
alert("タイマー停止")

circle.style.left="0px"

}

}

}

</script>

</body>
</html>
<?php
session_start();

// ログインしていない場合はログイン画面に強制送還
if (!isset($_SESSION['user_login'])) {
    header('Location: index.html');
    exit;
}
?>
<!-- ここから下に time.html の中身を書く -->
<h1>ログイン成功！限定コンテンツです。</h1>
