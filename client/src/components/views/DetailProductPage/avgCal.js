var reviews=document.querySelectorAll(".sum");
var total=document.getElementById("total");


function graph(){

for(let i=0;i<=4;i++){
temp=5-i;
clsName="bar-"+temp;
bar=document.getElementsByClassName(clsName);
var percentage=((Number(reviews[i].textContent)*100)/Number(total.textContent)).toFixed(2);
percentage=percentage+"%";
bar[0].style.width=percentage;

}

}


graph();
 
function avgCal(){
  sum=0
  for(let i=4;i>=0;i--){
    sum=sum+((i+1)*Number(reviews[5-i-1].textContent));
    console.log(sum);
  }

  document.getElementById("avg").textContent=(sum/(Number(total.textContent))).toFixed(2);

 } 

var star5=document.getElementById('star5');

star5.addEventListener("click",function(){
reviews[0].textContent=Number(reviews[0].textContent)+1;

total.textContent=Number(total.textContent)+1;
graph();
avgCal();

});


var star4=document.getElementById('star4');

star4.addEventListener("click",function(){
reviews[1].textContent=Number(reviews[1].textContent)+1;


total.textContent=Number(total.textContent)+1;
graph();
avgCal();

});

var star3=document.getElementById('star3');

star3.addEventListener("click",function(){
reviews[2].textContent=Number(reviews[2].textContent)+1;

total.textContent=Number(total.textContent)+1;
graph();
avgCal();


});


var star2=document.getElementById('star2');

star2.addEventListener("click",function(){
reviews[3].textContent=Number(reviews[3].textContent)+1;

total.textContent=Number(total.textContent)+1;
graph();
avgCal();

});


var star1=document.getElementById('star1');

star1.addEventListener("click",function(){
reviews[4].textContent=Number(reviews[4].textContent)+1;

total.textContent=Number(total.textContent)+1;
graph();
avgCal();

});




