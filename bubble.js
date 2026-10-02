

//var hit=0;
var timer=30;
let score=0;
var hitrn;
function getscore(){
  score+=10;
  document.querySelector('#scoreval').textContent=score;
}
function gethit(){
     hitrn = Math.floor(Math.random()*10);
     document.querySelector('#hitval').textContent=hitrn
}
function makebubble(){
    var cluter=''
for(let i =1; i<=80; i++){
    var rn =Math.floor(Math.random()*10);
  cluter += ` <div class="bubble">${rn}</div>`;
}
document.querySelector('#plbot').innerHTML=cluter;
}

function Timer(){
 var timerint=setInterval(function(){
    if(timer>0){
        timer--;
        document.querySelector('#timeval').textContent=timer;
    }
    else{
        clearInterval(timerint);
        document.querySelector('#plbot').innerHTML=`<h1>Game Over</h1>`
    }
    
 },1000);
}
document.querySelector('#plbot')
.addEventListener('click',function(dets){
   let clicknum= Number(dets.target.textContent);
   if(clicknum=== hitrn){
    getscore();
    makebubble();
    gethit();
   }
})
Timer();
makebubble();
gethit();
