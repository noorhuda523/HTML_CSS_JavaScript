let userscore =0;
let cmpscore =0;

const choice =document.querySelectorAll(".choice");
const msg =document.querySelector("#msg");
const uscore= document.querySelector("#userscore");
const cscore= document.querySelector("#cmpscore");


const genCompChoice =()=>{
    const option= ["rock","Paper","Scissor"];
    const randidx = Math.floor(Math.random()*3);
    return option[randidx];
}
const gamedraw= ()=>{
    console.log("Game Draw. try again");
    msg.innerText="Game Draw.Try again! ";
    msg.style.backgroundColor="#081b31";
}

const showwinner=(userWin)=> {
   if (userWin){
    userscore++;
    uscore.innerText= userscore;
    console.log("You win!");
    msg.innerText="You win!";
    msg.style.backgroundColor="green";
   }
   else{
    cmpscore++;
    cscore.innerText=cmpscore;
    console.log("You lose!");
    msg.innerText="You lose!";
    msg.style.backgroundColor="red";
   }


}
const playGame =(userchoice) =>{

    console.log("Your choice is ", userchoice);
     const CompChoice = genCompChoice();
     console.log("Computer choice is ", CompChoice);
     if(userchoice=== CompChoice){
        gamedraw();}
        else{
            let userWin=true;
            if(userchoice==="rock"){
                userWin= CompChoice==="paper" ?false:true;
            } else if(userchoice==="paper"){
                userWin= CompChoice==="scissors"? false:true;
            }
            else{
               userWin= CompChoice==="rock"?false:true;
            }
            showwinner(userWin);
        }
}

choice.forEach((choice)  => {
    choice.addEventListener("click",()=> {
        const userchoice= choice.getAttribute("Id");
    playGame(userchoice);
    });   

});
console.log(document);
