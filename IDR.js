const increase = document.getElementById("I");
const decrease = document.getElementById("D");
const reset = document.getElementById("R");
const label = document.getElementById("A");
let count = 0;


I.onclick = function(){

    count++;
    label.textContent = count;

}

D.onclick =function (){
 count--;
 label.textContent = count;

}
R.onclick = function(){
    count = 0;
    label.textContent = count;
    
}

