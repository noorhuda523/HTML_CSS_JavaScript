let btn =document.querySelector("#mode");
//let body=document.querySelector("body");

let currmode="light";
 
btn.addEventListener("click", () => {
    if (currmode === "light") {
        currmode = "dark";
        document.querySelector("body").style.backgroundColor="black";
        document.querySelector("body").style.Color="white";
    } else {
        currmode = "light";
        document.querySelector("body").style.backgroundColor="white";
        document.querySelector("body").style.Color="black";
    }
    
     console.log(currmode);
});

