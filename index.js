var root = document.getElementById("root")
var playerMode = document.getElementById("playermode")

playerMode.addEventListener("click", switchMode)

var divsRows = []
for (let i = 0; i < 3; i++) {
    var hold = document.createElement("div")
    hold.setAttribute("class", "divsrow")
    hold.setAttribute("value",  `row${i}`) 
    divsRows.push(hold)
    root.appendChild(hold)
}

var btn = []
for (let i = 0; i < 9; i++) {
    var hold = document.createElement("button")
    hold.setAttribute("class", "btn")
    hold.setAttribute("value",  `btn${i}`) 
    hold.addEventListener("click", noughts)
    btn.push(hold)
    divsRows[Math.floor(i / 3)].appendChild(hold)
}

var rows = []; var cols = []; var dig = []; 
for (let i = 0; i < btn.length; i+=3) { rows.push(btn.slice(i,i+3)) }
var a = 0; var b = 3; var c = 6; 
for (let i = 0; i < 3; i++) {
cols.push([btn[a],btn[b],btn[c]]); a++; b++; c++; }
dig.push([btn[0],btn[4],btn[8]]); dig.push([btn[2],btn[4],btn[6]])

var hold = "X"
var title = document.getElementById("title")

var playerHold = 1
function switchMode() {
var a = document.getElementById("player")
a.textContent == "1 Player" ? a.textContent = "2 Player" : a.textContent = "1 Player"
playerHold = playerHold == 1 ? 2 : 1
}

var btnHold = btn

function noughts(e) {
   playerMode.disabled = true
   this.textContent = hold;
   this.setAttribute("disabled", true)
   if (playerHold == 1) {
   if (find2s() == false) {
    btnHold = btnHold.filter(x => x.value != this.value)  
    var ran = Math.floor(Math.random() * btnHold.length)
    if (find()[0] != true) {
    if (btnHold[ran] != undefined) { btnHold[ran].textContent = "O" 
    var btnDisabledHold = btnHold[ran].value[3] 
    btn[btnDisabledHold].setAttribute("disabled", true) }
    btnHold = btnHold.filter(x => x.value != btnHold[ran].value)
    } answerDomUpdate() 
   } else {
   let btnHoldFind2 = find2s() 
   var btnChange = btn.filter(x => x.value == btnHoldFind2)
   if (find()[0] != true) { 
   btnChange[0].textContent = "O"
    btnChange[0].disabled = true;
    } answerDomUpdate() 
   } } else {
    answerDomUpdate(this)   
    hold = hold == "X" ? "O" : "X";
} }

var resetBtn = document.getElementById("resetbtn")
resetBtn.addEventListener("click", reset)

function reset() { 
    btn.map(x => {
    x.textContent = "" 
    x.disabled = false   
    x.style.color = "black"
})
playerMode.disabled = false
title.innerHTML = "Noughts & Crosses"
hold = "X"; 
btnHold = btn
}


function find() {

var rowsX = rows.map(arr => arr.map(x => [x.textContent, x.value]).filter(x => x[0] == "X")).filter(x => x.length == 3)
var rowsO = rows.map(arr => arr.map(x => [x.textContent, x.value]).filter(x => x[0] == "O")).filter(x => x.length == 3)

var colsX = cols.map(arr => arr.map(x => [x.textContent, x.value]).filter(x => x[0] == "X")).filter(x => x.length == 3)
var colsO = cols.map(arr => arr.map(x => [x.textContent, x.value]).filter(x => x[0] == "O")).filter(x => x.length == 3)

var digX = dig.map(arr => arr.map(x => [x.textContent, x.value]).filter(x => x[0] == "X")).filter(x => x.length == 3)
var digO = dig.map(arr => arr.map(x => [x.textContent, x.value]).filter(x => x[0] == "O")).filter(x => x.length == 3)

var arr = [rowsX, rowsO, colsX, colsO, digX, digO]

var btnTieCount = btn.map(x => x.textContent).filter(x => x != "")

if (arr.filter(x => x.length > 0).length >= 1) { 
    var btnCol = arr.filter(x => x.length > 0)
    
    return [true, btnCol] }


if (btnTieCount.length == 9) { return "tie"}
return false
}


function answerDomUpdate() {
    if (find()[0] == true) { 
        var btnAnswers = find()[1].flat(2).map(x => x[1])  
        btn.map(x => {
    if (btnAnswers.includes(x.value)) { x.style.color = "green"}
        })  
        btn.map(x => x.disabled = true)    
        title.innerHTML = `winner`}
        if (find() == "tie") { title.innerHTML = `Tie!`}

}

function find2s() {

   let row2O = rows.map(x => x.map(x => [x.textContent, x.value])).filter(x => x.filter(z => z[0] == "O").length == 2)
   let row2ansO = row2O.length > 0 ? row2O.map(x => x.filter(a => a[0] == "")).flat(2)[1] : false

   let cols2O = cols.map(x => x.map(x => [x.textContent, x.value])).filter(x => x.filter(z => z[0] == "O").length == 2)
   let cols2ansO = cols2O.length > 0 ? cols2O.map(x => x.filter(a => a[0] == "")).flat(2)[1] : false

   let dig2O = dig.map(x => x.map(x => [x.textContent, x.value])).filter(x => x.filter(z => z[0] == "O").length == 2)
   let dig2ansO = dig2O.length > 0 ? dig2O.map(x => x.filter(a => a[0] == "")).flat(2)[1] : false

   var winner = [row2ansO, cols2ansO, dig2ansO].filter(x => typeof x == "string")[0]

   let row2X = rows.map(x => x.map(x => [x.textContent, x.value])).filter(x => x.filter(z => z[0] == "X").length == 2)
   let row2ansX = row2X.length > 0 ? row2X.map(x => x.filter(a => a[0] == "")).flat(2)[1] : false

   let cols2X = cols.map(x => x.map(x => [x.textContent, x.value])).filter(x => x.filter(z => z[0] == "X").length == 2)
   let cols2ansX = cols2X.length > 0 ? cols2X.map(x => x.filter(a => a[0] == "")).flat(2)[1] : false

   let dig2X = dig.map(x => x.map(x => [x.textContent, x.value])).filter(x => x.filter(z => z[0] == "X").length == 2)
   let dig2ansX = dig2X.length > 0 ? dig2X.map(x => x.filter(a => a[0] == "")).flat(2)[1] : false

   var defence = [row2ansX, cols2ansX, dig2ansX].filter(x => typeof x == "string")[0]
 
   return  winner != undefined ? winner : defence != undefined ? defence : false 
}